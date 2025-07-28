import IngredientGroup from "../components/home/IngredientGroup";

const testData = [
  {
    id: "soia",
    quantity: 1
  },
  {
    id: "teriyaki",
    quantity: 2
  },
  {
    id: "ponzu",
    quantity: 1
  }
]

export default function Home() {
  return (
    <>
      <div>This is the Home page</div>
      <IngredientGroup name="salse" ingredients={testData} />
    </>
  )
}