import React ,{useEffect}from 'react'
import apiInstance from '../../Services/API/MyApi'


function AllBlogPost() {
   const GetAllBlogsApi= import.meta.env.VITE_API_GET_ALL_BLOGS_URL
   useEffect(() => {
    try{
        const fetchBlogs=async()=>{
            const response= await apiInstance.GetAllApi(GetAllBlogsApi)
            const result =response.json();
            console.log(result)
         };
         fetchBlogs();
    }catch(error){
        console.log(error)
    }
    
   
   }, [])
   
   
   
   return (
        <div className='container'>
        <table className="mt-4 table-borderless table table-hover table-dark">
        <thead>
            <tr>
                <th>Blog Id</th>
                <th>Blog Heading</th>
                <th>Blog Tags</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
                <tr>
                </tr>
        </tbody>
        </table> 
        </div>
    )
}

export default AllBlogPost
