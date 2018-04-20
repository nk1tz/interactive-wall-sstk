export default time => {
  const hour = time.getHours()
  if (hour < 12) {
    return 'Good Morning'
  } else if (hour < 16) {
    return 'Good Afternoon'
  } else {
    return 'Good Evening'
  }
}
