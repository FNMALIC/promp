// 'use client'

// import { useState, useEffect } from "react"

// import PrompCard from "./PrompCard"

// const PrompCardList = ({ data, handleTagClick }) => {

//     useEffect(() => {
//         console.log(data);
//         // data.map((subArray) => {
//             data.map((post) => {
//                 console.log(post._id);
//                 // console.log(data);
//             });
//         // }
//         // );

//     }, [data])
//     return (
//         <div className="mt-16 prompt_layout">
//             {data.map((post) => (
//         <PrompCard
//           key={post._id}
//           post={post}
//           handleTagClick={handleTagClick}
//         />
//       ))}
//         </div>
//     )
// }

// const Feed = () => {
//     const [searchText, setsearchText] = useState('')
//     const [Posts, setPosts] = useState([])
//     const handleSearchChange = (e) => {

//     }

//     // useEffect(() => {
//     //     const fetchPosts = async () => {
//     //         console.log("hello00000000000000");
//     //         try {
//     //             const res = await fetch('/api/prompt')
//     //                 .then(response => response.json())
//     //                 .then(data => {
//     //                     setPosts(data);
//     //                 })

//     //             // console.log(data);
//     //         } catch (error) {
//     //             console.log(error);
//     //         }

//     //     }
//     //     fetchPosts()
//     //     // console.log(Posts);
//     // }, [])

//     const fetchPosts = async () => {
//         const response = await fetch("/api/prompt").then(res => res.json())
//         const data = await response;
//         console.log(data);
//         setPosts(data);
//       };
    
//       useEffect(() => {
//         fetchPosts();
//         console.log(fetchPosts());
//       }, []);


//     return (
//         <section className="feed">
//             <form className="relative w-full flex-center">
//                 <input
//                     type="text"
//                     placeholder="search for a tag or username"
//                     value={searchText}
//                     onChange={handleSearchChange}
//                     required
//                     className="search_input peer"
//                 />
//             </form>
//             <PrompCardList
//                 data={[Posts]}
//                 handleTagClick={() => { }}
//             />
//         </section>
//     )
// }

// export default Feed

"use client";

import { useState, useEffect } from "react";

import PrompCard from "./PrompCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PrompCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;