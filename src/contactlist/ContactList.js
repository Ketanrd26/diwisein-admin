import React, { useContext } from "react";
import Tablecomp from "../comp/Table";
import { render } from "sass";
import { contextData } from "../Context";

const ContactList = () => {
  const columnConfig = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
      isSearchable: true,
    },
    {
      title: "contact",
      dataIndex: "contact",
      key: "contact",
      isSearchable: true,
    },
    {
        title: "message",
        dataIndex: "message",
        key: "message",
        isSearchable: true,
        render: (_, record) => (
          <div className="action_btn" style={{ display: "flex", gap: "10px" }}>
            <textarea disabled>
              {record.message}
            </textarea>
          </div>
        ),
      }
      
  ];


  const conData = useContext(contextData);


  return (
    <>
      <Tablecomp columnConfig={columnConfig} tableData={conData.contactData} />
    </>
  );
};

export default ContactList;
