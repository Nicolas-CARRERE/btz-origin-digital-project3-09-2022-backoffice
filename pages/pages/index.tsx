import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import pageFetcher from "../../services/pageFetcher";
import { TPage } from "../../src/types/types";
import SearchBar from "../../src/components/SearchBar";
import ModalOnDelete from "../../src/components/modal/ModalOnDelete";

export default function index() {
  const [pages, setPages] = useState<Partial<TPage>[]>([]);
  const [itemToDelete, setItemToDelete] = useState<string | null>();
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    pageFetcher.getPages().then((response) => {
      setPages(response);
    });
  }, []);

  const handleItemToDelete = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setShowModal(true);
    setItemToDelete(e.currentTarget.id);
  };

  const handleDeleteConfirmed = (): void => {
    pageFetcher.deletePageById(itemToDelete as string).then(() => {
      pageFetcher.getPages().then((data) => setPages(data));
    });
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
      <div className="rounded-xl">
        <table className="w-[90%] h-[50px] mt-[3em] ml-[5%] text-xl border border-black border-1 rounded-[10px] bg-white  drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]">
          <thead className="h-[50px] rounded-t-[10px]">
            <tr>
              <th>Name</th>
              <th>Display</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>Preview</th>
            </tr>
          </thead>
          <tbody className="rounded-b-[10px]">
            {pages
              .filter((page) => {
                if (query === "") {
                  return page;
                }
                if (
                  page.title &&
                  page.title.toLowerCase().includes(query.toLowerCase().trim())
                ) {
                  return page;
                }
                return null;
              })
              .sort((a, b) =>
                (a.title as string) > (b.title as string) ? 1 : -1
              )
              .map((page) => (
                <tr
                  key={page.id}
                  className="h-[45px] odd:bg-lightgrey even:bg-white"
                >
                  <td className="border border-black px-5">{page.title}</td>

                  <td className="border text-center">
                    {page.display ? <p>✔️</p> : <p>❌</p>}
                  </td>

                  <td className="border text-center">
                    <button id={page.id} type="button">
                      <Link href={`/pages/${page.id}`}>📝</Link>
                    </button>
                  </td>

                  <td className="border text-center">
                    <button
                      id={page.id}
                      type="button"
                      onClick={handleItemToDelete}
                    >
                      🗑️
                    </button>
                  </td>
                  <td className="border text-center ">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={`${process.env.NEXT_PUBLIC_PROD_URL}/pages/${page.id}`}
                    >
                      👁️
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="w-[50px] mt-[1em] ml-[5%]">
        <button type="button" onClick={() => router.push("/pages/new-page")}>
          <Image width={50} height={50} src="/plus.svg" alt="logo-plus" />
        </button>
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
