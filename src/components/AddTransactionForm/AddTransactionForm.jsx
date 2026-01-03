import styles from "./AddTransactionForm.module.css";
import { useState } from "react";
import clsx from "clsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import { selectCategories } from "../../redux/Statistics/selectors";
import { useSelector } from "react-redux";
import Select from "react-select";
import { customStyles } from "./customStyles";
import { useDispatch } from "react-redux";
import { addTransactions } from "../../redux/transactions/operations";
import { closeAddModal } from "../../redux/Modals/slice";
import CustomDropIndicator from "../CustomDropIndicator/CustomDropIndicator";
import { toast } from "react-toastify";

function AddTransactionForm() {
  const categoriesFromAPI = useSelector(selectCategories);

  const defaultCategories = [
    {
      id: "c9d9e447-1b83-4238-8712-edc77b18b739",
      name: "Main expenses",
      type: "EXPENSE",
    },
    {
      id: "27eb4b75-9a42-4991-a802-4aefe21ac3ce",
      name: "Products",
      type: "EXPENSE",
    },
    {
      id: "3caa7ba0-79c0-40b9-ae1f-de1af1f6e386",
      name: "Car",
      type: "EXPENSE",
    },
    {
      id: "bbdd58b8-e804-4ab9-bf4f-695da5ef64f4",
      name: "Self care",
      type: "EXPENSE",
    },
    {
      id: "76cc875a-3b43-4eae-8fdb-f76633821a34",
      name: "Child care",
      type: "EXPENSE",
    },
    {
      id: "128673b5-2f9a-46ae-a428-ec48cf1effa1",
      name: "Household products",
      type: "EXPENSE",
    },
    {
      id: "1272fcc4-d59f-462d-ad33-a85a075e5581",
      name: "Education",
      type: "EXPENSE",
    },
    {
      id: "c143130f-7d1e-4011-90a4-54766d4e308e",
      name: "Leisure",
      type: "EXPENSE",
    },
    {
      id: "719626f1-9d23-4e99-84f5-289024e437a8",
      name: "Other expenses",
      type: "EXPENSE",
    },
    {
      id: "3acd0ecd-5295-4d54-8e7c-d3908f4d0402",
      name: "Entertainment",
      type: "EXPENSE",
    },
    {
      id: "063f1132-ba5d-42b4-951d-44011ca46262",
      name: "Income",
      type: "INCOME",
    },
  ];

  const categories =
    categoriesFromAPI && categoriesFromAPI.length > 0
      ? categoriesFromAPI
      : defaultCategories;
  const [isChecked, setIsChecked] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const handleChange = () => {
    setIsChecked(!isChecked);
  };
  const dispatch = useDispatch();

  const categoriesForSelect = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const selectDefaultValue = categoriesForSelect.find(
    (item) => item.label === "Main expenses"
  );

  const [selectedOption, setSelectedOption] = useState(null);

  const currentDate = new Date();

  const schema = yup.object().shape({
    amount: yup.number().required("Number invalid value"),
    transactionDate: yup
      .date()
      .required("Date is required")
      .default(() => currentDate),
    switch: yup.boolean(),
    category: yup.string(),
    comment: yup.string().required(),
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    if (!isChecked) {
      // Income
      const incomeCategory = categories.find((el) => el.type === "INCOME");
      if (!incomeCategory) {
        toast.error("Income category not found");
        return;
      }
      data.categoryId = incomeCategory.id;
      data.type = "INCOME";
      data.amount = Math.abs(data.amount);
    } else {
      // Expense
      if (selectedOption) {
        data.categoryId = selectedOption.value;
      } else {
        const defaultExpenseCategory = categories.find(
          (el) => el.name === "Main expenses"
        );
        if (!defaultExpenseCategory) {
          toast.error("Default expense category not found");
          return;
        }
        data.categoryId = defaultExpenseCategory.id;
      }
      data.type = "EXPENSE";
      data.amount = Math.abs(data.amount) * -1;
    }

    const date = new Date(data.transactionDate);
    data.transactionDate = format(date, "yyyy-MM-dd");

    delete data.switch;
    delete data.category;

    dispatch(addTransactions(data))
      .unwrap()
      .then(() => {
        toast.success("Transaction added successfully");
        dispatch(closeAddModal());
      })
      .catch((error) => {
        toast.error(error || "Failed to add transaction");
      });
  };

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleMenuOpen = () => {
    setMenuIsOpen(true);
  };

  const handleMenuClose = () => {
    setMenuIsOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.switch__wrapper}>
        <span className={clsx(styles.span_text, !isChecked && styles.income_active)}>
          Income
        </span>
        <label htmlFor="switch" className={styles.switch}>
          <input
            {...register("switch")}
            type="checkbox"
            id="switch"
            checked={isChecked}
            onChange={handleChange}
            className={styles.switch__input}
          />
          <span className={styles.switch__slider}></span>
        </label>
        <span className={clsx(styles.span_text, isChecked && styles.expense_active)}>
          Expense
        </span>
      </div>
      {isChecked && (
        <div className={styles.comment}>
          <Select
            classNamePrefix="react-select"
            styles={customStyles}
            className={styles.select_form}
            defaultValue={selectDefaultValue}
            onChange={setSelectedOption}
            options={categoriesForSelect}
            placeholder="Select a category"
            onMenuOpen={handleMenuOpen}
            onMenuClose={handleMenuClose}
            components={{
              DropdownIndicator: () => {
                return menuIsOpen ? (
                  <CustomDropIndicator up={true} />
                ) : (
                  <CustomDropIndicator up={false} />
                );
              },
            }}
          />
        </div>
      )}
      <div className={styles.sum_data_wrap}>
        <div className={styles.sum_wrap}>
          <input
            {...register("amount")}
            type="number"
            autoComplete="off"
            placeholder="0.00"
            className={styles.sum}
            autoFocus
            onKeyPress={(event) => {
              if (!/[0-9.]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
          {errors.amount && (
            <span className={styles.comment_err}>{"Enter a number"}</span>
          )}
        </div>
        <div className={styles.data_wrap} onClick={() => setIsDatePickerOpen(true)}>
          <Controller
            name="transactionDate"
            control={control}
            render={({ field }) => (
              <>
                <DatePicker
                  selected={field.value || currentDate}
                  onChange={(date) => field.onChange(date)}
                  dateFormat="dd.MM.yyyy"
                  open={isDatePickerOpen}
                  onClickOutside={() => setIsDatePickerOpen(false)}
                  className={styles.customDatePicker}
                  calendarClassName={styles.calendarClassName}
                  maxDate={currentDate}
                  showPopperArrow={false}
                  popperClassName={styles.calendarPopper}
                  locale="en-US"
                  renderCustomHeader={({
                    date,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                  }) => (
                    <div className={styles.customHeader}>
                      <button
                        type="button"
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                        className={styles.navButton}
                      >
                        {"<"}
                      </button>
                      <div className={styles.currentMonth}>
                        {date.toLocaleString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                      <button
                        type="button"
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                        className={styles.navButton}
                      >
                        {">"}
                      </button>
                    </div>
                  )}
                />
              </>
            )}
          />
          <div className={styles.svg_wrap}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g clipPath="url(#clip0_60_133)">
                <path
                  d="M9 11H7V13H9V11ZM13 11H11V13H13V11ZM17 11H15V13H17V11ZM19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V9H19V20Z"
                  fill="#734AEF"
                />
              </g>
              <defs>
                <clipPath id="clip0_60_133">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div className={clsx(styles.comment_bottom)}>
        <input
          {...register("comment")}
          type="text"
          className={styles.input}
          placeholder="Comment"
          autoComplete="off"
        />
        {errors.comment && (
          <span className={styles.comment_err}>{"Enter a comment"}</span>
        )}
      </div>
      <button className={clsx(styles.btn, styles.btn_add)} type="submit">
        Add
      </button>
      <button
        className={clsx(styles.btn, styles.btn_cancel)}
        type="button"
        onClick={() => {
          dispatch(closeAddModal());
        }}
      >
        Cancel
      </button>
    </form>
  );
}

export default AddTransactionForm;
