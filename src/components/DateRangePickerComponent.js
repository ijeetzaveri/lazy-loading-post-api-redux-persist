import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class DateRangePickerComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateRange: [null, null],
    };
  }

  render() {
    const [startDate, endDate] = this.state.dateRange;

    return (
      <div>
        <label>Select Date Range: </label>
        <DatePicker
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={async (update) => {
            this.setState({ dateRange: update });
            await this.props.onDateRangeChange(update);
          }}
          // maxDate={new Date()}
          isClearable={true}
          shouldCloseOnSelect={true}
        />
      </div>
    );
  }
}

export default DateRangePickerComponent;
