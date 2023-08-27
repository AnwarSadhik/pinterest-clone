import { TbLoader3 } from "react-icons/tb"

const loading = () => {
    return (
      <div
          className="text-3xl font-extrabold flex justify-center items-center h-screen"
      >
        <TbLoader3 size={30} className="animate-spin"/>
      </div>
    )
  }
  
  export default loading