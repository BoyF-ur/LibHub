import React, { useState, useRef, useEffect } from 'react';
import { TfiAgenda } from "react-icons/tfi";
import { MdAdd, MdClose} from "react-icons/md"

const TagInput = ({tags, setTags}) => {
    
    const [inputValue, setInputValue] = useState("");
    const categories = ["Technology", "Economy", "History", "Language", "Psychology", "Phylosophy"];

    const addNewTag = () => {
        if(inputValue.trim() !== "") {
            setTags([...tags, inputValue.trim()]);
            setInputValue("");
        }
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleKeyDown = (e) => {
        if(e.key === "Enter"){
            addNewTag();
        }
    }

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

  return (
    <div>
        {tags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap mt-2 ">
                {tags.map((tag, index) => (
                    <span key={index} className="flex items-center gap-2 text-sm text-yellow-600 bg-pornhub-200/30 px-3 py-1 rounded">
                        <TfiAgenda className="text-sm" /> {tag}
                        <button onClick={() => handleRemoveTag(tag)}>
                            <MdClose />
                        </button>
                    </span>
                ))}
                </div>
        )}

        <div className="flex items-centers gap-4 mt-3">
        <select
            className="text-sm bg-tranparent border px-3 py-1 rounded outline-none"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
        >
            <option value="" disabled>Select a category</option>
            {categories.map((cat) => (
            <option key={cat} value={cat}>
                {cat}
            </option>
            ))}
        </select>

            <button className="w-8 h-8 flex items-center justify-center rounded border hover:bg-pornhub-200" onClick={addNewTag}>
                <MdAdd className="text-2xl text-black hover:text-white"/>
            </button>
        </div>
    </div>
  )
}

export default TagInput