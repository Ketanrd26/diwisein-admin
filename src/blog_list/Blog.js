import React, { useContext, useEffect } from "react";
import Tablecomp from "../comp/Table";
import { contextData } from "../Context";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import axios from "axios";

import "./Blog.scss";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
const Blog = () => {
  const { blogsData, setBlogsData } = useContext(contextData);

  console.log(blogsData, "blogs");

  const deleteBlog = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this user?"
      );
      if (!confirmDelete) return;

      await axios.delete(
        `${process.env.REACT_APP_PORT_BACKEND}blog/deleteBlog/${id}`
      );

      setBlogsData((prevData) => prevData.filter((item) => item.id !== id));
      alert("blog has been deleted");
    } catch (error) {
      console.log(error)
    }
  };

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    console.log(id);
  }, [location]);

  const editBlog = (id) => {
    navigate(`/addBlog?id=${id}`);
  };

  const columnConfig = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Blog Image",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <div class="image" style={{ width: "200px" }}>
          <img
            src={`https://images.diwise.in/diwiseblog/${record.image}`}
            alt=""
            style={{ width: "100%", aspectRatio: 1 }}
          />
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      isSearchable: true,
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
      render: (_, record) => (
        <div className="action_btn" style={{ display: "flex", gap: "10px" }}>
          <textarea disabled style={{ width: "100%" }}>
            {record.description}
          </textarea>
        </div>
      ),
    },
    {
      title: "action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div className="action_btn" style={{ display: "flex", gap: "10px" }}>
          <button className="table_btn" onClick={() => deleteBlog(record.id)}>
            <MdDeleteOutline />
          </button>
          <button className="table_btn" onClick={() => editBlog(record.id)}>
            <MdOutlineEdit />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div class="top_section">
        <div class="btn_list">
          <Link to="/addBlog" class="btn">
            Add Blog
          </Link>
        </div>
      </div>
      <Tablecomp
        columnConfig={columnConfig}
        tableData={blogsData && blogsData}
      />
    </>
  );
};

export default Blog;
