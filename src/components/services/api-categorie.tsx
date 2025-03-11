export const ApiCategorie = () => {
  fetch('https://api.upwork.com/graphql').then(response => {
    console.log(response)
  })
}