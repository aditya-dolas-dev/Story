import Auth from "../components/Auth"
import Quote from "../components/Quote"

const Signin = () => {

  return <div>
  <div className="grid grid-cols-1 lg:grid-cols-2">
      <div>
          <Auth type="signin" />
      </div>
      <div className="hidden lg:block">
          <Quote label="A room without books is like a body without a soul." author="– Dr. Seuss

"/>
      </div>
  </div>
</div>
}

export default Signin