import React, { useEffect, useState } from "react";
import "./Blog.scss";
import DOMPurify from "dompurify";
import axios from "axios";
import { useLocation, useSearchParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Addblog = () => {
  const [blogForm, setBlogForm] = useState({
    date: "",
    category: "",
    title: "",
    description: "",
  });
  const [imageData, setDataImage] = useState(null);
  const sanitizeConfig = {
    ALLOWED_TAGS: [
      "b",
      "i",
      "em",
      "strong",
      "a",
      "img",
      "p",
      "ul",
      "li",
      "ol",
      "br",
      "iframe",
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "title", "target", "style"],
  };
  const sanitizedDescription = DOMPurify.sanitize(
    blogForm.description,
    sanitizeConfig
  );

  const getBlogById = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PORT_BACKEND}blog/getBlogById/${id}`
      );

      const data = response.data.response[0];

      setBlogForm({
        date: data.date,
        category: data.category,
        title: data.title,
        description: data.description,
      });

      setDataImage(data.image);
    } catch (error) {
      console.log(error);
    }
  };
  const [searchParams] = useSearchParams(); // Destructure to get URLSearchParams
  const location = useLocation();
  useEffect(() => {
    const id = searchParams.get("id");

    if (id) {
      getBlogById(id);
    }
  }, [location, searchParams]);

  const addBlog = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", imageData);
      formData.append("blog", JSON.stringify(blogForm));

      const id = searchParams.get("id");

      let response;
      if (id) {
        response = await axios.put(
          `${process.env.REACT_APP_PORT_BACKEND}blog/updateBlog/${id}`,
          formData
        );
      } else {
        response = await axios.post(
          `${process.env.REACT_APP_PORT_BACKEND}blog/addBlog`,
          formData
        );
      }
      
      setBlogForm({
        date: "",
        category: "",
        title: "",
        description: "",
      });

      setDataImage(null);
      window.reload();
      alert("blog has been added");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div class="add_blog parent">
        <div class="add_blog_form">
          <form action="" onSubmit={addBlog}>
            <div class="form_row">
              <label for=""> Select Image </label>
              <input
                type="file"
                onChange={(e) => setDataImage(e.target.files[0])}
              />
            </div>
            <div class="form_row">
              <label for=""> Select Date </label>
              <input
                type="date"
                value={blogForm.date}
                onChange={(e) => {
                  setBlogForm({ ...blogForm, date: e.target.value });
                }}
              />
            </div>
            <div class="form_row">
              <label for=""> Category </label>
              <input
                type="text"
                value={blogForm.category}
                onChange={(e) => {
                  setBlogForm({ ...blogForm, category: e.target.value });
                }}
              />
            </div>
            <div class="form_row">
              <label for=""> title</label>
              <input
                type="text"
                value={blogForm.title}
                onChange={(e) => {
                  setBlogForm({ ...blogForm, title: e.target.value });
                }}
              />
            </div>
            <div class="form_row">
              <label for=""> description</label>
              {/* <textarea
                type="text"
                value={blogForm.description}
                onChange={(e) => {
                  setBlogForm({ ...blogForm, description: e.target.value });
                }}
              /> */}

              <div style={{ width: "100%" }}>
                <CKEditor
                  editor={ClassicEditor}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                  }}
                  onReady={(editor) => {
                    editor.editing.view.change((writer) => {
                      writer.setStyle(
                        "min-height",
                        "200px",
                        editor.editing.view.document.getRoot()
                      );
                    });
                  }}
                />
              </div>
            </div>
            <div class="form_row">
              <label>Preview:</label>
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizedDescription,
                }}
              />
            </div>
            <div class="form_row">
              <input className="btn" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Addblog;
