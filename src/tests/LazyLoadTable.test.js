import React from "react";
import { Dialog, DialogTitle } from "@mui/material";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";

import LazyLoadTable from "../components/LazyLoadTable";
import { getPosts } from "../service/apiService";

jest.mock("../service/apiService");

describe("Post List Component", () => {
  // beforeEach(async () => {
  //   await getPosts.mockClear();
  // });

  // it("matches snapshot for mount render", () => {
  //   const wrapper = mount(<LazyLoadTable />);
  //   expect(toJson(wrapper)).toMatchSnapshot();
  // });

  // it("renders post list correctly after fetching from API", async () => {
  //   // Mocking the API call
  //   const mockPosts = [
  //     {
  //       author: "tosh",
  //       created_at: "2024-01-24T11:30:07Z",
  //       title: "Prompts Are Tiny Programs",
  //       url: "https://twitter.com/balajis/status/1750086314928873865",
  //       objectID: "39175624",
  //     },
  //     {
  //       author: "mindracer",
  //       created_at: "2024-01-24T11:30:01Z",
  //       title:
  //         "Palworld Controversy: Why Pokemon Fans Are Calling for a Nintendo Lawsuit",
  //       url: "https://www.denofgeek.com/games/palworld-controversy-explained-pokemon-fans-nintendo-lawsuit/",
  //       objectID: "39175633",
  //     },
  //   ];
  //   getPosts.mockResolvedValue({ hits: mockPosts });

  //   // Using async/await and setTimeout to wait for the asynchronous operation
  //   const wrapper = mount(<LazyLoadTable />);
  //   await new Promise((resolve) => setTimeout(resolve, 0));
  //   wrapper.update();

  //   expect(wrapper.find("Styled(ForwardRef(TableRow))")).toHaveLength(2);
  //   expect(wrapper.text()).not.toContain("Error");
  // });

  // it("renders post list correctly and click on a row to open Modal", async () => {
  //   // Mocking the API call
  //   const mockPosts = [
  //     {
  //       author: "tosh",
  //       created_at: "2024-01-24T11:30:07Z",
  //       title: "Prompts Are Tiny Programs",
  //       url: "https://twitter.com/balajis/status/1750086314928873865",
  //       objectID: "39175624",
  //     },
  //     {
  //       author: "mindracer",
  //       created_at: "2024-01-24T11:30:01Z",
  //       title:
  //         "Palworld Controversy: Why Pokemon Fans Are Calling for a Nintendo Lawsuit",
  //       url: "https://www.denofgeek.com/games/palworld-controversy-explained-pokemon-fans-nintendo-lawsuit/",
  //       objectID: "39175633",
  //     },
  //   ];
  //   getPosts.mockResolvedValue({ hits: mockPosts });

  //   // Using async/await and setTimeout to wait for the asynchronous operation
  //   const wrapper = mount(<LazyLoadTable />);
  //   await new Promise((resolve) => setTimeout(resolve, 0));
  //   wrapper.update();

  //   expect(wrapper.find("Styled(ForwardRef(TableRow))")).toHaveLength(2);

  //   wrapper.find("tr").at(0).simulate("click");

  //   wrapper.update();

  //   const modalDisplay = wrapper.find("ModalDialog");

  //   const modalChildren = modalDisplay.find(Dialog);

  //   modalChildren
  //     .find(DialogTitle)
  //     .filterWhere((element) => element.text().includes("Selected Row Data"));

  //   expect(modalChildren.exists()).toBeTruthy();
  // });

  it("renders post list with search result correctly", async () => {
    // Mocking the API call
    const mockPosts = [
      {
        author: "tosh",
        created_at: "2024-01-24T11:30:07Z",
        title: "Prompts Are Tiny Programs",
        url: "https://twitter.com/balajis/status/1750086314928873865",
        objectID: "39175624",
      },
      {
        author: "mindracer",
        created_at: "2024-01-24T11:30:01Z",
        title:
          "Palworld Controversy: Why Pokemon Fans Are Calling for a Nintendo Lawsuit",
        url: "https://www.denofgeek.com/games/palworld-controversy-explained-pokemon-fans-nintendo-lawsuit/",
        objectID: "39175633",
      },
    ];
    const initialState = {
      searchField: "author",
      search: "mindracer",
    };

    // Using async/await and setTimeout to wait for the asynchronous operation
    const wrapper = mount(<LazyLoadTable />);
    wrapper.setState(initialState);
    wrapper.update();
    
    getPosts.mockResolvedValue({ hits: mockPosts });
    
    await new Promise((resolve) => setTimeout(resolve, 0));
    wrapper.update();

    console.log("STATE VALUES ::::::::::::: ", wrapper.state());
    expect(wrapper.find("Styled(ForwardRef(TableRow))")).toHaveLength(1);
    expect(wrapper.text()).not.toContain("Error");
  });
});
