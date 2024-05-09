import React, { Component } from "react";
import moment from "moment";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";
import { styled } from "@mui/system";

import { getPosts } from "../service/apiService";

import ModalDialog from "./ModalDialog";
import DateRangePickerComponent from "./DateRangePickerComponent";

import classes from "./LazyLoadTable.module.css";

// Define custom styles
const StyledTable = styled(Table)({
  width: "100%",
  marginBottom: "20px",
});

const StyledTableHeaderRow = styled(TableRow)({
  background: "#f2f2f2",
});

const StyledTableRow = styled(TableRow)({
  "&:hover": {
    backgroundColor: "#e0e0e0",
  },
});

const StyledTableCell = styled(TableCell)({
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
  maxWidth: "400px",
  wordWrap: "break-word",
});

const StyleTableContainer = styled(TableContainer)({
  overflowY: "auto",
});

class LazyLoadTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filteredData: [],
      hasMore: true,
      selectedRowData: null,
      isDialogOpen: false,
      page: 0,
      isFetching: false,
      search: "",
      searchField: "title",
      dateRangeData: [],
      dateRange: [null, null],
      loading: true,
    };
    this.tableRef = React.createRef();
    this.timerRef = null;
  }

  fetchData = async (lazyLoad = false) => {
    try {
      this.setState({ loading: true }, async () => {
        if (this.state.isFetching) {
          return;
        }

        this.setState({ isFetching: true });

        await new Promise((resolve) => setTimeout(resolve, 2000));

        const { hits: responseData, nbPages: totalPages } = await getPosts(
          this.state.page
        );

        if (totalPages <= this.state.page) {
          clearInterval(this.timerRef);
          this.setState({ loading: false });

          return toast.success("All records were getting successfully.");
        }

        this.setState(
          (prevState) => ({
            data: [...prevState.data, ...responseData],
            filteredData: [...prevState.data, ...responseData],
            page: prevState.page + 1,
            hasMore: responseData.length > 0,
            isFetching: false,
            dateRangeData: [],
            loading: false,
          }),
          async () => {
            await this.filterDateRangeData();

            if (this.state.search !== "") {
              this.handleSearch();
            }

            if (lazyLoad) {
              clearInterval(this.timerRef);
              this.startTimer();
            }
          }
        );
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      this.setState({ isFetching: false, loading: false });
    }
  };

  filterDateRangeData = async () => {
    if (!this.state.dateRange.includes(null)) {
      const startDate = this.state.dateRange[0];
      const endDate = this.state.dateRange[1];

      const dateRangeData = this.state.filteredData.filter((item) => {
        const postDate = moment(item.created_at);

        return (
          (!startDate ||
            postDate.isSameOrAfter(moment(startDate).startOf("day"))) &&
          (!endDate || postDate.isSameOrBefore(moment(endDate).endOf("day")))
        );
      });

      this.setState({ dateRangeData });
    }
  };

  startTimer = () => {
    this.timerRef = setInterval(() => {
      this.fetchData();
    }, 10000);
  };

  handleIntersection = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && this.state.hasMore) {
      this.fetchData(true);
    }
  };

  handleRowClick = (rowData) => {
    this.setState({ selectedRowData: rowData, isDialogOpen: true });
  };

  handleCloseDialog = () => {
    this.setState({ isDialogOpen: false });
  };

  handleSearchChange = (event) => {
    const search = event.target.value;
    this.setState({ search }, () => {
      if (search.trim() !== "") {
        this.handleSearch();
      }
    });
  };

  handleSearchFieldChange = (event) => {
    const searchField = event.target.value;
    this.setState({ searchField }, () => {
      if (this.state.search.trim() !== "") {
        this.handleSearch();
      }
    });
  };

  handleSearch = async () => {
    const { data, search, searchField } = this.state;
    const normalizedSearch = search.toLowerCase().trim();

    const filteredData = data.filter((item) => {
      const fieldValue = String(item[searchField]).toLowerCase();

      return fieldValue.includes(normalizedSearch);
    });

    this.setState(
      { filteredData },
      async () => await this.filterDateRangeData()
    );
  };

  handleDateRangeChange = async (range) => {
    this.setState({ dateRange: range }, async () => {
      await this.filterDateRangeData();
    });
  };

  componentDidMount() {
    this.fetchData();
    this.startTimer();

    window.addEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      this.fetchData(true);
    }
  };

  componentWillUnmount() {
    if (this.tableRef.current) {
      const observer = new IntersectionObserver(this.handleIntersection, {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      });
      observer.unobserve(this.tableRef.current);
    }
    clearInterval(this.timerRef);

    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    const {
      selectedRowData,
      isDialogOpen,
      search,
      searchField,
      dateRange,
      loading,
      filteredData,
      hasMore,
      dateRangeData,
    } = this.state;

    return (
      <>
        <div className={classes.filter}>
          <div className={classes.filterMargin}>
            <TextField
              select
              label="Select Field"
              value={searchField}
              onChange={this.handleSearchFieldChange}
              sx={{ mr: 2 }}
            >
              <MenuItem key="title" value="title">
                Title
              </MenuItem>
              <MenuItem key="url" value="url">
                URL
              </MenuItem>
              <MenuItem key="author" value="author">
                Author
              </MenuItem>
            </TextField>
            <TextField
              label="Search"
              value={search}
              onChange={this.handleSearchChange}
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: <SearchIcon />,
              }}
            />
          </div>
          <div className={classes.filterMargin}>
            <DateRangePickerComponent
              dateRange={dateRange}
              onDateRangeChange={this.handleDateRangeChange}
            />
          </div>
        </div>
        <div className={classes.marginTop1}>
          <InfiniteScroll
            dataLength={filteredData.length}
            next={() => this.fetchData(true)}
            hasMore={hasMore}
            scrollableTarget="scrollableDiv"
          >
            <StyleTableContainer component={Paper} ref={this.tableRef}>
              <div className={classes.width100}>
                <StyledTable>
                  <TableHead>
                    <StyledTableHeaderRow key="thead">
                      <StyledTableCell>Title</StyledTableCell>
                      <StyledTableCell>URL</StyledTableCell>
                      <StyledTableCell>Created At</StyledTableCell>
                      <StyledTableCell>Author</StyledTableCell>
                    </StyledTableHeaderRow>
                  </TableHead>
                  <TableBody>
                    {!dateRange.includes(null) ? (
                      dateRangeData.length === 0 && !loading ? (
                        <StyledTableRow>
                          <StyledTableCell
                            colSpan="4"
                            className={classes.alignCenter}
                          >
                            No records found
                          </StyledTableCell>
                        </StyledTableRow>
                      ) : (
                        dateRangeData.map((post, index) => (
                          <StyledTableRow
                            className="recordedData"
                            key={post.objectID + index}
                            onClick={() => this.handleRowClick(post)}
                          >
                            <StyledTableCell>{post.title}</StyledTableCell>
                            <StyledTableCell>{post.url}</StyledTableCell>
                            <StyledTableCell>
                              {moment(post?.created_at).format(
                                "DD-MM-YYYY hh:mm:ss a"
                              )}
                            </StyledTableCell>
                            <StyledTableCell>{post.author}</StyledTableCell>
                          </StyledTableRow>
                        ))
                      )
                    ) : filteredData.length === 0 && !loading ? (
                      <StyledTableRow>
                        <StyledTableCell
                          colSpan="4"
                          className={classes.alignCenter}
                        >
                          No records found
                        </StyledTableCell>
                      </StyledTableRow>
                    ) : (
                      filteredData.map((post, index) => (
                        <StyledTableRow
                          className="recordedData"
                          key={post.objectID + index}
                          onClick={() => this.handleRowClick(post)}
                        >
                          <StyledTableCell>{post.title}</StyledTableCell>
                          <StyledTableCell>{post.url}</StyledTableCell>
                          <StyledTableCell>
                            {moment(post?.created_at).format(
                              "DD-MM-YYYY hh:mm:ss a"
                            )}
                          </StyledTableCell>
                          <StyledTableCell>{post.author}</StyledTableCell>
                        </StyledTableRow>
                      ))
                    )}
                    {loading && (
                      <StyledTableRow>
                        <StyledTableCell
                          colSpan="4"
                          className={classes.alignCenter}
                        >
                          <CircularProgress />
                        </StyledTableCell>
                      </StyledTableRow>
                    )}
                  </TableBody>
                </StyledTable>
              </div>
            </StyleTableContainer>
          </InfiniteScroll>

          {/* Dialog Modal */}
          <ModalDialog
            open={isDialogOpen}
            onClose={this.handleCloseDialog}
            selectedRowData={selectedRowData}
          />
        </div>
      </>
    );
  }
}

export default LazyLoadTable;
