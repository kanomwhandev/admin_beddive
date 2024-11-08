'use server'

import { checkRole } from '@/app/utils/roles'
import { clerkClient } from '@clerk/nextjs/server'

export async function setRole(formData: FormData) {
  // Check that the user trying to set the role is an admin
  if (!checkRole('admin')) {
    return { message: 'Not Authorized' }
  }

  try {
    const res = await clerkClient().users.updateUser(formData.get('id') as string, {
      publicMetadata: { role: formData.get('role') },
    })
    return Promise.resolve()
  } catch (err) {
    return { message: err }
  }
}

export async function removeRole(formData: FormData) {
  try {
    const res = await clerkClient().users.updateUser(formData.get('id') as string, {
      publicMetadata: { role: null },
    })
    return Promise.resolve()
  } catch (err) {
    return { message: err }
  }
}
