import React, { useRef, useState } from 'react'
import "./Table.scss"
import PropTypes from "prop-types";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
const Tablecomp = ({tableData, columnConfig, onRowClick,  }) => {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
  
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
  
    const handleReset = (clearFilters) => {
      clearFilters();
      setSearchText("");
    };
  
    const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
          />
        ) : (
          text
        ),
    });
  
    // Build the columns dynamically
    const columns = columnConfig.map((col) => ({
      ...col,
      ...(col.isSearchable ? getColumnSearchProps(col.dataIndex) : {}),
    }));
  
    
    const handleRowClick = (record) => {
      if (onRowClick) {
        onRowClick(record);
      }
    };
    return (
      <div className="table-cont parent">
       
          <div class="table">
          <Table
            columns={columns}
            dataSource={tableData}
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
            })}
          />
          </div>
      
      </div>
    );
  };
  
  Tablecomp.propTypes = {
    tableData: PropTypes.array.isRequired,
    columnConfig: PropTypes.array.isRequired,
  
  
};

export default Tablecomp
