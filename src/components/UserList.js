import React, { Fragment } from "react";
import VirtualizedList from "./VirtualizedList/VirtualizedList";
import styled from "styled-components";

const UsersList = ({ users, handleRowClick, listHeight = 400 }) => {
  return (
    <Fragment>
      <ItemRow className="header">
        <span className="idCol">ID</span>
        <span className="fwCol">Name</span>
        <span className="longCol">E-Mail</span>
        <span className="longCol">Date Joined</span>
      </ItemRow>
      <VirtualizedList
        numItems={users.length}
        itemHeight={40}
        windowHeight={listHeight}
        renderItem={({ index, style }) => {
          const user = users[index];
          return (
            <ItemRow
              key={user.id}
              index={index}
              className={user.selected ? "itemSelected" : "item"}
              style={style}
              onClick={() => handleRowClick(index)}
            >
              <span className="idCol">{user.id}</span>
              <span className="fwCol">{user.name}</span>
              <span className="longCol">{user.email}</span>
              <span className="longCol">
                {new Date(user.dateJoined).toISOString()}
              </span>
            </ItemRow>
          );
        }}
      />
    </Fragment>
  );
};

const ItemRow = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 40px;
  align-items: center;

  background-color: ${props =>
    props.index % 2 === 0 ? "white" : "whitesmoke"};

  &.header {
    font-weight: bold;
    background-color: transparent;
    padding-right: 16px;
  }

  &.itemSelected {
    background-color: lightgrey;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
  }

  span {
    padding: 0px 16px;
    width: 120px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: left;

    &.idCol {
      text-align: right;
    }

    &.longCol {
      width: 200px;
    }

    &.fwCol {
      width: auto;
      flex-grow: 2;
    }
  }
`;

export default UsersList;
