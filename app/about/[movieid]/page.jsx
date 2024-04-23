"use client";
import axios from "axios";
import { Play, X } from "lucide-react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Image from "next/image";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { useRouter } from "next/navigation";

const Youtubecom = ({ name, setplay }) => {
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  return (
    <div className=" absolute z-[100] backdrop-brightness-50 backdrop-grayscale  inset-0 flex-col   flex justify-center items-center">
      <div>
        {" "}
        <button
          onClick={() => setplay(false)}
          className=" flex justify-end  w-full"
        >
          <X />
        </button>
        <YouTube videoId={name} opts={opts} />
      </div>
    </div>
  );
};

const Page = () => {
  const route = useRouter();
  const [casts,setcasts]=useState();
  const [show, setshow] = useState();
  const params = useSearchParams();
  const gh = params.get("name");
  const [play, setplay] = useState(false);
  const [video,setvideo] =useState();
  const [recom,setrecom]=useState();

  useEffect(() => {
    const options = {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZjM2NjNiZTdiYmVlYjZiYjgwOTA1MDIyM2JiZmQxNyIsInN1YiI6IjY2MjRkZGU1YWY5NTkwMDE3ZDY4ZGJiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mPi5pvbRuujCetIphjO96rXieclqR8NG8RFaViDBKeU",
      },
    };

    axios.get(`https://api.themoviedb.org/3/movie/${gh}?language=en-US`, options).then(function (response) {
      console.log(response.data);
      setshow(response.data);
    });
    axios.get(`https://api.themoviedb.org/3/movie/${gh}/videos?language=en-US`, options).then(function (response) {
      console.log(response.data);
      setvideo(response.data);
    });
    axios.get(`https://api.themoviedb.org/3/movie/${gh}/credits?language=en-US`, options).then(function (response) {
      console.log(response.data);
      setcasts(response.data);
      
    });
    axios.get(`https://api.themoviedb.org/3/movie/${gh}/recommendations?language=en-US&page=1`, options).then(function (response) {
      console.log(response.data);
      setrecom(response.data.results);
      
    });
  }, [gh]);

  return (
    <div className=" w-full ">
      {show && (
        <div>
          {play && <Youtubecom name={video.results[0].key} setplay={setplay} />}
          <div className=" p-10 flex  gap-3">
            <div className=" w-[30%] relative h-[350px]">
              <Image
                src={"https://image.tmdb.org/t/p/original" + show.poster_path}
                fill
              />
            </div>
            <div className=" w-[70%]">
              <div className=" text-2xl font-bold text-blue-700  space-x-2">
                <span>{show.title}</span>
                <span className=" text-red-600">
                  ({show.release_date.substring(0, 4)})
                </span>
              </div>
              <div className=" space-x-3">
                <span>{show.release_date}</span>
                <span className=" space-x-3">
                  {show.genres.map((item) => (
                    <span key={item.name}>{item.name}</span>
                  ))}
                </span>
                <span>
                  {show.runtime > 60
                    ? parseInt(show.runtime / 60) +
                      "h" +
                      (show.runtime % 60) +
                      "m"
                    : show.runtime + "m"}
                </span>
              </div>
              <div className=" text-xs">{show.overview}</div>
              <div className="flex justify-between mt-5">
                {" "}
                <button
                  onClick={() => setplay(true)}
                  className=" flex gap-2 items-center hover:bg-zinc-700 p-3 rounded-xl "
                >
                  <Play />
                  <span>Play</span>
                </button>
              <span> Revenue - ${show.revenue}</span>
              <span> Budget - ${show.budget}</span>
              </div>
            </div>
          </div>
          <div>
          <div className="flex  overflow-x-scroll gap-2">
            {casts && casts.cast
              .filter((ite) => ite.character)
              .map((item) => (
                <div key={item.name}>
                  <div className=" relative min-w-56 h-64">
                  <Image
                    src={
                      "https://image.tmdb.org/t/p/original" + item.profile_path
                    }
                    fill
                  />
                </div>
                  <div className=" text-center">{item.name}</div>
                </div>
              ))}
          </div>
          </div>
        </div>
      )}
 <div className="">
        {recom ? (
          <div className="flex gap-3 justify-center overflow-x-scroll">
            {recom.map((item) => {
              return (
                <div key={item.id} onClick={() => route.push(`/about/ss?name=${item.id}`)}>
                  <CardContainer className="inter-var">
                    <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl cursor-pointer dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] max-w-[250px] sm:w-[30rem] h-full rounded-xl p-6 border  ">
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
};

export default Page;

/*useEffect(() => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${gh}?language=en-US`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZjM2NjNiZTdiYmVlYjZiYjgwOTA1MDIyM2JiZmQxNyIsInN1YiI6IjY2MjRkZGU1YWY5NTkwMDE3ZDY4ZGJiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mPi5pvbRuujCetIphjO96rXieclqR8NG8RFaViDBKeU",
      },
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
      setshow(response.data);
    });
  }, []); */
