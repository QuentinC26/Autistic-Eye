from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    # Automatically called by DRF to check if the user has the right to perform the action on the object (obj)
    def has_object_permission(self, request, view, obj):
        # Checks if the method used (like GET or HEAD) is a method that does not modify the data.
        if request.method in permissions.SAFE_METHODS:
            # If the previous condition is true (so the method is "safe"), we grant the permission immediately by returning True.
            return True
        # Checks that the logged in user (request.user) is the author of the object (obj.author)
        return obj.author == request.user
