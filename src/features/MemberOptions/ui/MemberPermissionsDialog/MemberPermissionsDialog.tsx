import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/Dialog"
import { Switch } from "@/shared/ui/switch.tsx"
import { Label } from "@/shared/ui/label.tsx"
import {
  useMemberOptionsStore,
  useRoomDetailsStore,
} from "@/app/providers/StoreProvider/StoresRegister"
import { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { Button } from "@/shared/ui/Button"

interface IMemberPermissionsDialogProps {
  memberId: string
}

export const MemberPermissionsDialog = observer(
  ({ memberId }: IMemberPermissionsDialogProps) => {
    const roomStore = useRoomDetailsStore()
    const memberOptionsStore = useMemberOptionsStore()

    useEffect(() => {
      const member = roomStore.roomData?.members.find((m) => m.id === memberId)

      if (member?.permissions) {
        memberOptionsStore.setPermissions(member.permissions)
      }

      memberOptionsStore.setMemberName(member.displayName)
    }, [memberId, memberOptionsStore, roomStore.roomData])

    return (
      <Dialog>
        <DialogTrigger className="w-full p-2 text-left text-sm">
          Изменить права
        </DialogTrigger>
        <DialogContent className="gap-8">
          <DialogHeader>
            <DialogTitle>
              Разрешения пользователя: {memberOptionsStore.memberName}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Задачи:</Label>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p>Создавать задачи</p>
                  <Switch
                    checked={memberOptionsStore.permissions.canCreateTask}
                    onCheckedChange={(checked) =>
                      memberOptionsStore.updatePermission(
                        "canCreateTask",
                        checked
                      )
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <p>Удалять задачи</p>
                  <Switch
                    checked={memberOptionsStore.permissions.canDeleteTask}
                    onCheckedChange={(checked) =>
                      memberOptionsStore.updatePermission(
                        "canDeleteTask",
                        checked
                      )
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <p>Перемещать задачи</p>
                  <Switch
                    checked={memberOptionsStore.permissions.canMoveTask}
                    onCheckedChange={(checked) =>
                      memberOptionsStore.updatePermission(
                        "canMoveTask",
                        checked
                      )
                    }
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Статусы:</Label>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p>Создавать статусы</p>
                  <Switch
                    checked={memberOptionsStore.permissions.canCreateStatus}
                    onCheckedChange={(checked) =>
                      memberOptionsStore.updatePermission(
                        "canCreateStatus",
                        checked
                      )
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <p>Удалять статусы</p>
                  <Switch
                    checked={memberOptionsStore.permissions.canDeleteStatus}
                    onCheckedChange={(checked) =>
                      memberOptionsStore.updatePermission(
                        "canDeleteStatus",
                        checked
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Отмена</Button>
            </DialogClose>
            <Button
              onClick={() =>
                memberOptionsStore.updateMemberPermissions(memberId)
              }
            >
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }
)

export default MemberPermissionsDialog
