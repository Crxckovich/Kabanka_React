import type { RootStore } from "@/app/providers/StoreProvider/RootStore.ts"
import { makeAutoObservable } from "mobx"
import type { IPermissions } from "@/entities/RoomMember"

export class MemberOptionsStore {
  permissions: IPermissions = {
    canCreateStatus: false,
    canCreateTask: false,
    canMoveTask: false,
    canDeleteTask: false,
    canDeleteStatus: false,
    canManageUsers: false,
  }
  memberName: string

  setPermissions(permissions: IPermissions) {
    this.permissions = permissions
  }

  setMemberName(text: string) {
    this.memberName = text
  }

  updatePermission(key: keyof IPermissions, value: boolean) {
    this.permissions = {
      ...this.permissions,
      [key]: value,
    }
  }

  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  async updateMemberPermissions(targetMemberId: string) {
    try {
      const websocket = this.root.roomDetailsStore.websocket

      websocket.send({
        type: "update-permissions",
        payload: {
          memberId: targetMemberId,
          permissions: this.permissions,
        },
      })
    } catch (e) {
      console.error("Ошибка обновления прав пользователя:", e)
    }
  }

  async removeMember(targetMemberId: string) {
    try {
      const websocket = this.root.roomDetailsStore.websocket

      websocket.send({
        type: "remove-member",
        memberId: targetMemberId,
      })
    } catch (e) {
      console.error("Ошибка кика пользователя:", e)
    }
  }
}
