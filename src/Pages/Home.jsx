import { useRecoilValue } from "recoil"
import Card from "../Components/Card"
import Cards from "../Components/Cards"
import Filter from "../Components/Filter"
import Header from "../Components/HeaderDashboard"
import Search from "../Components/Search"
import categories from "../Data/Categories"
import { category } from "../store/Atom/authentication"
import { useLocation } from "react-router-dom"


const Home = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let cat = queryParams.get('cat');
  return (
    <div>
      <Header userFirstName="Jatin" />
      <div className="container">
        <h2>Categories</h2>
        <div/>
        <div className="flex items-center flex-wrap justify-center">
          {
            categories.map((cat, idx)=>{
              return <Card name={cat.name} key={idx}/>
            })
          }
        </div>
        <div className="flex gap-2 justify-center items-center px-2 py-4">
          {<Search />}
          <Filter />
        </div>
        <div className="py-[20px] flex gap-2 flex-col w-full border border-sky-500">
          <Cards />
        </div>
      </div>
    </div>
  )
}

export default Home