import { useEffect, useState } from "react";

export default function Search() {
  const [posts, setPosts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchInput, setDebounceSearchInput] = useState(null);
  const fetchPost = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(()=>{
    let timer = setTimeout(()=>{
        setDebounceSearchInput(searchInput);
    },500)

    return ()=> clearTimeout(timer)
  },[searchInput])

  const filterdData = posts.filter((post)=>{
    return post.title.toLowerCase().includes(debouncedSearchInput.toLowerCase());
  })


  return (
    <div className="space-y-4 my-2">
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {filterdData.map((post) => (
          <div
            key={post.id}
            style={{
              border: "1px solid",
              padding: "4px",
            }}
          >
            <h1>{post.title}</h1>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
