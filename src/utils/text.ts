export const getAvatarFallback = (name: string) => {
  const [firstName, lastName] = name.split(' ')

  return `${firstName.charAt(0)}${lastName ? lastName.charAt(0) : ''}`
}
