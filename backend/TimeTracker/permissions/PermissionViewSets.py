from rest_framework import viewsets

class CustomPermissionViewSet(viewsets.ViewSet):
    permission_classes_by_action = {}

    def get_permissions(self):
        try:
            # return permission_classes depending on action
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            # action is not set, return default permission_classes
            if self.permission_classes:
                return [permission() for permission in self.permission_classes]
            return []