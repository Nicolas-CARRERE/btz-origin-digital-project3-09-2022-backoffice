import React, { useEffect, useState } from "react";
import Image from "next/image";
import categoryFetcher from "../../services/categoryFetcher";
import plus from "../../src/assets/plus.svg";
import { TCategory } from "../../src/types/types";
import SearchBar from "../../src/components/SearchBar";

export default function index() {
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [createMode, setCreateMode] = useState<boolean>(false);
  const [itemToEdit, setItemToEdit] = useState<string | null>();
  const [itemToDelete, setItemToDelete] = useState<string | null>();
  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState<string>("");

  useEffect(() => {
    categoryFetcher.getCategories().then((response) => {
      setCategories(response);
    });
  }, []);

  const handleItemToCreate = (): void => {
    if (categoryName) {
      categoryFetcher.createCategory(categoryName).then(() => {
        categoryFetcher.getCategories().then((data) => setCategories(data));
      });
    }
    setCreateMode(false);
  };

  const handleItemToEdit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (editMode) {
      setEditMode(false);
    }
    setItemToEdit(e.currentTarget.id);
    setEditMode(() => !editMode);
  };

  const handleItemToEditCancel = (): void => {
    setEditMode(false);
    setItemToEdit(null);
  };

  const handleItemToUpdate = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (categoryName) {
      categoryFetcher
        .updateCategoryById(e.currentTarget.id, categoryName)
        .then(() => {
          categoryFetcher.getCategories().then((data) => setCategories(data));
        });
    }
    setEditMode(false);
  };

  const handleItemToDelete = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setShowModal(true);
    setItemToDelete(e.currentTarget.id);
  };

  const handleDeleteConfirmed = (): void => {
    categoryFetcher.deleteCategoryById(itemToDelete).then(() => {
      categoryFetcher.getCategories().then((data) => setCategories(data));
    });
    setShowModal(false);
  };

  const handleDeleteCancelled = (): void => {
    setShowModal(false);
  };

  return (
    <div className="w-full bg-lightgrey">
      <SearchBar />
      <div className="rounded-xl">
        <table className="w-[90%] h-[50px] mt-[3em] ml-[5%] text-xl border border-black border-1 rounded-[10px] bg-white  drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]">
          <thead className="h-[50px] rounded-t-[10px]">
            <th>Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </thead>
          <tbody className="rounded-b-[10px]">
            {categories
              .sort((a, b) => (a.name > b.name ? 1 : -1))
              .map((category: TCategory) => (
                <tr
                  key={category.id}
                  className="h-[45px] odd:bg-lightgrey even:bg-white last:rounded-b-[10px]"
                >
                  <td className="border border-black px-5 last:rounded-bl-[10px]">
                    {editMode && itemToEdit === category.id ? (
                      <input
                        type="text"
                        name="name"
                        className="border border-black"
                        placeholder={category.name}
                        defaultValue={category.name}
                        onChange={(e) => setCategoryName(e.target.value)}
                      />
                    ) : (
                      category.name
                    )}
                  </td>
                  {editMode && itemToEdit === category.id ? (
                    <td className="border text-center bg-[#008000]">
                      <button
                        id={category.id}
                        type="button"
                        onClick={handleItemToUpdate}
                      >
                        SAVE
                      </button>
                    </td>
                  ) : (
                    <td className="border text-center">
                      <button
                        id={category.id}
                        type="button"
                        onClick={handleItemToEdit}
                      >
                        📝
                      </button>
                    </td>
                  )}
                  {editMode && itemToEdit === category.id ? (
                    <td className="border text-center last:rounded-br-[10px] bg-[#FF0000]">
                      <button
                        className="w-full h-full bg-red"
                        type="button"
                        onClick={handleItemToEditCancel}
                      >
                        CANCEL
                      </button>
                    </td>
                  ) : (
                    <td className="border text-center last:rounded-br-[10px]">
                      <button
                        id={category.id}
                        type="button"
                        onClick={handleItemToDelete}
                      >
                        🗑️
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            {createMode && (
              <tr className="h-[45px] odd:bg-lightgrey even:bg-white last:rounded-b-[10px]">
                <td className="border border-black px-5 last:rounded-bl-[10px]">
                  <input
                    type="text"
                    name="name"
                    className="border border-black"
                    placeholder="please enter a name"
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                </td>
                <td className="border text-center bg-[#008000]">
                  <button type="button" onClick={handleItemToCreate}>
                    SAVE
                  </button>
                </td>
                <td className="border text-center last:rounded-br-[10px] bg-[#FF0000]">
                  <button
                    className="w-full h-full bg-red"
                    type="button"
                    onClick={handleItemToEditCancel}
                  >
                    CANCEL
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="w-[50px] mt-[1em] ml-[5%]">
        <button type="button" onClick={() => setCreateMode(!createMode)}>
          <Image src={plus} alt="logo-plus" />
        </button>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Are you sure you want to delete this item?</p>
            <div className="modal-buttons">
              <button
                className="bg-green w-1/2 mr-2"
                type="button"
                onClick={handleDeleteConfirmed}
              >
                Delete
              </button>
              <button
                className="bg-red w-1/2 ml-2"
                type="button"
                onClick={handleDeleteCancelled}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
