import styled, { css } from "styled-components";
import DatePicker from "react-datepicker";
import zhLocale from "date-fns/locale/zh-CN"; // 导入中文语言包
import SpinnerMini from "../ui/SpinnerMini";

import "react-datepicker/dist/react-datepicker.css";

import { useState } from "react";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { useSettings } from "../features/settings/useSettings";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

const StyledTimeSelect = styled.div`
  font-size: 1.4rem;
  padding: 0.4rem;
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-grey-700);
    margin-right: 0.5rem;
  }

  & span {
    margin: 0.3rem;
  }
`;

const StyledButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  margin-left: 0.5rem;
  padding: 0.44rem 0.8rem;

  background-color: var(--color-grey-200);
  color: var(--color-grey-700);

  ${(props) =>
    props.type === "search" &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}
`;

const StyledDatePicker = styled(DatePicker)`
  background-color: var(--color-grey-0);
  border: none;
  display: flex;
  align-items: center;
  width: 14rem;
  text-align: center;

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
`;

function TimeSelect() {
  var day = 60 * 60 * 24 * 1000;
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  // new Date(startDate.getTime() + day)
  const [searchParams, setSearchParams] = useSearchParams();

  const { settings, isLoading } = useSettings();

  if (isLoading) return <SpinnerMini />;

  function handleReset() {
    setStartDate(null);
    setEndDate(null);

    searchParams.delete("startDate");
    searchParams.delete("endDate");
    setSearchParams(searchParams);
  }

  function handleClick() {
    if (startDate && endDate) {
      const formattedStartDate = `${startDate.getFullYear()}-${
        startDate.getMonth() + 1
      }-${startDate.getDate()}`;
      const formattedEndDate = `${endDate.getFullYear()}-${
        endDate.getMonth() + 1
      }-${endDate.getDate()}`;
      if (startDate < endDate) {
        searchParams.set("startDate", formattedStartDate);
        searchParams.set("endDate", formattedEndDate);
        setSearchParams(searchParams);
      } else {
        // searchParams.delete("startDate");
        // searchParams.delete("endDate");
        // setSearchParams(searchParams);
        toast.error("请输入正确的日期区间！");
      }
    }
  }

  return (
    <StyledTimeSelect>
      <HiOutlineCalendarDays />
      <StyledDatePicker
        id="start-date"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        calendarClassName="rasta-stripes"
        selectsStart
        placeholderText="入住日期..."
        startDate={startDate}
        endDate={endDate}
        minDate={new Date()}
        dateFormat="yyyy年MM月dd日"
        locale={zhLocale} // 设置中文语言包
      />
      <span>--</span>
      <StyledDatePicker
        id="end-date"
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        placeholderText="退房日期..."
        startDate={startDate}
        endDate={endDate}
        minDate={startDate?.getTime() + day}
        maxDate={startDate?.getTime() + day * settings.maxBookingLength}
        dateFormat="yyyy年MM月dd日"
        locale={zhLocale} // 设置中文语言包
      />
      <StyledButton onClick={handleReset}>重置</StyledButton>
      <StyledButton onClick={handleClick} type="search">
        搜索
      </StyledButton>
    </StyledTimeSelect>
  );
}

export default TimeSelect;
