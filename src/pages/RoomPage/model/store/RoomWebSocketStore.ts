import { makeAutoObservable, runInAction } from "mobx"
import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localStorage.ts"
import type { RoomDetailsStore } from "./roomDetailsStore"
import type { IRoomWithRelations } from "@/pages/RoomPage/types/roomPage.types.ts"
import { getRouteRoom } from "@/shared/const/router"

export class RoomWebSocketStore {
  private socket: WebSocket | null = null
  isConnected = false
  roomData: IRoomWithRelations = null
  private isJoinByInvite = false

  constructor(private roomDetailsStore: RoomDetailsStore) {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  connectByRoomId(roomId: string, guestId?: string) {
    if (this.socket) this.disconnect()
    this.isJoinByInvite = false

    const { accessToken } = JSON.parse(
      localStorage.getItem(USER_LOCALSTORAGE_KEY) || "{}"
    )

    let url = `ws://localhost:5001/ws/room?roomId=${roomId}`

    if (accessToken) {
      url += `&token=${accessToken}`
    }
    if (guestId) {
      url += `&guestId=${guestId}`
    }

    this.connectWithUrl(url, { roomId })
  }

  connectByInviteCode(inviteCode: string) {
    if (this.socket) this.disconnect()
    this.isJoinByInvite = true

    const { accessToken } = JSON.parse(
      localStorage.getItem(USER_LOCALSTORAGE_KEY) || "{}"
    )

    const url = accessToken
      ? `ws://localhost:5001/ws/room?token=${accessToken}&inviteCode=${inviteCode}`
      : `ws://localhost:5001/ws/room?inviteCode=${inviteCode}`

    this.connectWithUrl(url, { inviteCode })
  }

  private connectWithUrl(
    url: string,
    meta: { roomId?: string; inviteCode?: string }
  ) {
    this.socket = new WebSocket(url)

    this.socket.onopen = () => {
      runInAction(() => {
        this.isConnected = true
      })
      console.log(`WebSocket connected: ${meta.roomId || meta.inviteCode}`)

      this.send({
        type: "join-room",
        ...(meta.roomId && { roomId: meta.roomId }),
        ...(meta.inviteCode && { inviteCode: meta.inviteCode }),
      })
    }

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      this.handleMessage(data)
    }

    this.socket.onclose = () => {
      runInAction(() => {
        this.isConnected = false
      })
      console.log("WebSocket disconnected")
    }

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error)
    }
  }

  private handleMessage(data: any) {
    console.log("WS Message received:", data.type)

    switch (data.type) {
      case "room-joined":
        runInAction(() => {
          this.roomData = data.payload
          this.roomDetailsStore.setRoomData(data.payload)
          this.roomDetailsStore.setLoading(false)

          if (this.isJoinByInvite && data.payload?.id) {
            const newPath = getRouteRoom(data.payload.id)
            window.location.replace(newPath)
            this.isJoinByInvite = false
          }
        })
        break

      case "user-left":
      case "user-joined":
      case "member-removed":
      case "permissions-updated":
      case "task-created":
      case "task-updated":
      case "task-moved":
      case "tasks-reordered":
      case "task-deleted":
      case "status-created":
      case "status-deleted":
      case "statuses-reordered":
      case "room-deleted":
      case "room-updated":
      case "public-toggled":
      case "leaved-by-button":
        this.roomDetailsStore.updateFromWS(data)
        break

      case "error":
        console.error("WS Error:", data.message)
        break
    }
  }

  send(message: object) {
    if (!this.socket) {
      console.warn("WebSocket is not initialized")
      return
    }

    if (this.socket.readyState === WebSocket.OPEN) {
      console.log("WS SEND:", message)
      this.socket.send(JSON.stringify(message))
    }
  }

  disconnect() {
    this.send({
      type: "leave",
    })

    this.socket?.close()
    this.socket = null
    this.isConnected = false
  }
}
