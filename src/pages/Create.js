import { useState } from "react"
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";
const Create = () => {
  const [title,setTitle] = useState();
  const [method,setMethod] = useState();
  const [rating,setRating] = useState();
  const [formError,setFormError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!title || !method || !rating) {

      setFormError('Please fill all the details')
      return
    }

    const {data,error} = await supabase
    .from('smoothies')
    .insert([{title,method,rating}])
    .select()

    if(error) {
      console.log(error)
      setFormError('Please fill all the details')
    }

    if(data) {
      console.log('Hello')
      console.log(data)
      setFormError(null)
      navigate('/')
    }

  }

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input 
          type="text" 
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Method:</label>
        <textarea 
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input 
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Create Smoothie Recipe</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Create