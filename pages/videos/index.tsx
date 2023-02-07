import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { TVideo } from "../../src/types/types";
import SearchBar from "../../src/components/SearchBar";
import videoFetcher from "../../services/videoFetcher";
import ModalOnDelete from "../../src/components/modal/ModalOnDelete";
import secondsToHms from "../../services/secondsToHms";

function Videos() {
  const [videos, setVideos] = useState<TVideo[]>([]);
  const [itemToDelete, setItemToDelete] = useState<string | null>();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    videoFetcher.getVideos().then((response) => {
      setVideos(response);
      setIsLoading(false);
    });
  }, []);

  const handleItemToDelete = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setShowModal(true);
    setItemToDelete(e.currentTarget.id);
  };

  const handleDeleteConfirmed = (): void => {
    videoFetcher
      .deleteVideoById(itemToDelete as string)
      .then(() => videoFetcher.getVideos().then((data) => setVideos(data)));
    setShowModal(false);
  };

  const handleDeleteCancelled = (): void => {
    setShowModal(false);
  };

  const handleSearch = (search: string) => {
    setQuery(search);
  };

  return (
    <div className="w-full bg-lightgrey">
      <SearchBar onSearch={handleSearch} />
      {isLoading ? (
        <div className="text-xl mt-3">Is loading...</div>
      ) : (
        <div className="rounded-xl">
          <table className="w-[90%] h-[50px] mt-[3em] ml-[5%] text-xl border border-black rounded-[10px] bg-white  drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]">
            <thead className="h-[50px] rounded-t-[10px]">
              <tr>
                <th>Title</th>
                <th>Duration</th>
                <th>Video</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody className="rounded-b-[10px]">
              {videos
                .filter(
                  (video) =>
                    video.title.toLowerCase().includes(query.toLowerCase()) ||
                    video.description
                      .toLowerCase()
                      .includes(query.toLowerCase())
                )
                .sort((a, b) => (a.title > b.title ? 1 : -1))
                .map((video) => (
                  <tr
                    key={video.id}
                    className="h-[45px] odd:bg-lightgrey even:bg-white last:rounded-b-[10px]"
                  >
                    <td className="border border-black px-5 last:rounded-bl-[10px]">
                      {video.title}
                    </td>
                    <td className="border px-5">
                      {secondsToHms(video.duration)}
                    </td>

                    <td className="border p-2">
                      <video
                        controls
                        className="m-auto"
                        width="200"
                        height="200"
                      >
                        <source src={video.videoUrl} type="video/mp4" />
                        <track src={video.videoUrl} kind="captions" />
                      </video>
                    </td>
                    <td className="border text-center">
                      <Link href={`/videos/${video.id}`}>📝</Link>
                    </td>
                    <td className="border text-center last:rounded-br-[10px]">
                      <button
                        id={video.id}
                        type="button"
                        onClick={handleItemToDelete}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="w-[50px] mt-[1em] ml-[5%]">
        <Link href="/videos/new-video">
          <Image width={50} height={50} src="/plus.svg" alt="logo-plus" />
        </Link>
      </div>
      {showModal && (
        <ModalOnDelete
          handleDeleteConfirmed={handleDeleteConfirmed}
          handleDeleteCancelled={handleDeleteCancelled}
        />
      )}
    </div>
  );
}

export default Videos;
