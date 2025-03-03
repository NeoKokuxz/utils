  const permissionStatus = await navigator.permissions.query({ name: 'clipboard-write' as PermissionName });
  return permissionStatus.state === 'granted' ? false : true;
