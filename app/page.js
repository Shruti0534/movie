"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function Home() {
  const [show, setshow] = useState(null);
  const route = useRouter();
  const [name, setname] = useState("");
  const [popular,setpopular]=useState();

  const options = {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZjM2NjNiZTdiYmVlYjZiYjgwOTA1MDIyM2JiZmQxNyIsInN1YiI6IjY2MjRkZGU1YWY5NTkwMDE3ZDY4ZGJiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mPi5pvbRuujCetIphjO96rXieclqR8NG8RFaViDBKeU",
    },
  };

  useEffect(()=>{
    axios.get(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,options).then(function (response) {
      console.log(response.data.results);
      setpopular(response.data.results);
    });
  },[])

  const onSubmit = async (e) => {
    setname(e.target.value);
   

    axios.get(`https://api.themoviedb.org/3/search/movie?query=${e.target.value}&include_adult=false&language=en-US&page=1`, options).then(function (response) {
      console.log(response.data.results);
      setshow(response.data.results);
    });
   
  };
const [number,setnumber] = useState(0);
  useEffect(()=>{
     const time = setInterval(() => {
      setnumber(prev=>(prev+1)%20)
    }, 10000);
    return ()=> clearInterval(time)
  })
  return (
    <div className={`w-full `}>
     {popular && <Image className=" fixed inset-0 opacity-50" src={`https://image.tmdb.org/t/p/original${popular[number].backdrop_path}`} fill/>}
      <div
        className={`fixed  z-50 left-[50%] ${
          name.length > 0 ? "Name top-[5%]" : " top-[50%] toptodown"
        } -translate-x-[50%] -translate-y-[50%]`}
      >
        <div className=" w-full" >
          <input
          className=" px-2 py-1 rounded-full w-full border bg-transparent"
          type="text"
          placeholder=" SEARCH MOVIE..."
          onChange={(e) => onSubmit(e)}
          value={name}
        />
        <Search  className="absolute  top-1 right-3"/></div>
      </div>
      <div className="">
        {show ? (
          <div className="flex flex-wrap gap-3 justify-center ">
            {show.map((item) => {
              return (
                <div key={item.id} onClick={() => route.push(`/about/ss?name=${item.id}`)}>
                  <CardContainer className="inter-var">
                    <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl  cursor-pointer dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] max-w-[250px] sm:w-[30rem] h-full rounded-xl p-6 border  ">
                      <CardItem
                        translateZ="50"
                        className="text-xl font-bold text-neutral-600 dark:text-white"
                      >
                        {item.title}
                      </CardItem>

                      <CardItem translateZ="100" className="w-full mt-4">
                        <Image
                          src={
                            "https://image.tmdb.org/t/p/original" +
                            item.poster_path
                          }
                          height="1000"
                          width="1000"
                          className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                          alt="thumbnail"
                        />
                      </CardItem>
                      <CardItem
                        as="p"
                        translateZ="60"
                        className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                      >
                        {item.overview.substring(0, 65) + "...."}
                      </CardItem>
                      <div className="text-neutral-500  text- text-sm max-w-sm mt-2 dark:text-neutral-300">
                        {item.release_date}{" "}
                      </div>
                    </CardBody>
                  </CardContainer>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/*  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZjM2NjNiZTdiYmVlYjZiYjgwOTA1MDIyM2JiZmQxNyIsInN1YiI6IjY2MjRkZGU1YWY5NTkwMDE3ZDY4ZGJiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mPi5pvbRuujCetIphjO96rXieclqR8NG8RFaViDBKeU",
      },
    };

    axios.request(options).then(function (response) {
      setshow(response.data.results);
      console.log(response.data.results);
    });
  }, []);
  <div>
      {show ? (
        <div className="flex flex-wrap">
          {show.map((item) => {
            return (
             <div onClick={()=>route.push(`/about/${item.title}`)}>
               <CardContainer  className="inter-var">
                <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] max-w-[250px] sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white"
                  >
                    {item.title}
                  </CardItem>
                 
                  <CardItem translateZ="100" className="w-full mt-4">
                    <Image
                      src={"https://image.tmdb.org/t/p/original" + item.backdrop_path}
                      height="1000"
                      width="1000"
                      className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                      alt="thumbnail"
                    />
                    
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                  >
                    {item.overview.substring(0,65)+'....'}
                  </CardItem>
                  <div  className="text-neutral-500  text- text-sm max-w-sm mt-2 dark:text-neutral-300">{item.release_date} </div>
                  
                </CardBody>
              </CardContainer>
             </div>
            );
          })}
        </div>
      ) : (
        <div>loading</div>
      )}
    </div> */
