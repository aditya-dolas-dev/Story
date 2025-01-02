import Auth from "../components/Auth"
import Quote from "../components/Quote"

const Signup = () => {
  return (
    <div>
       <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
               <Auth type='signup'/>
            </div>
            <div className="hidden lg:block">
            <Quote label={"Reading is essential for those who seek to rise above the ordinary."} author={"– Jim Rohn"} />

            </div>
        </div>
    </div>
  )
}

export default Signup