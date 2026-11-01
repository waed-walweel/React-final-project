import react from 'react' 
import axios from 'axios' 


export default function Categories() { 
    const [categories, setCategories] = useState([])
   const getCategories = async () => { 

   const response = await axios.get('https://knowledgeshop.runasp.net/api/Categories') 
   console.log()
   setCategories(response.data.response.data)
   } 
   useEffect(() => {
    getCategories()
   }, []) 

return (
    <div>
        <h1>Categories</h1>
    </div>
)
}