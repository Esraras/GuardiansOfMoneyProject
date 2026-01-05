/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import { selectCategories } from "../../redux/Statistics/selectors";
import { selectTransactions } from "../../redux/transactions/selectors";
import { editTransactions } from "../../redux/transactions/operations";
import { closeEditModal, selectIsEditID } from "../../redux/Modals/slice";
import styles from "./EditTransactionForm.module.css";
import clsx from "clsx";
import { toast } from "react-toastify";

function EditTransactionForm() {
  const categories = useSelector(selectCategories);
  const transactions = useSelector(selectTransactions);
  const [isChecked, setIsChecked] = useState(true);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const dispatch = useDispatch();

  const IdForEdit = useSelector(selectIsEditID);
  const foundObject = transactions.find((item) => item.id === IdForEdit);

  const category = categories.find((cat) => cat.id === foundObject.categoryId);
  const categoryName =
    foundObject.type === "INCOME"
      ? "Income"
      : category
      ? category.name
      : "Unknown";

  useEffect(() => {
    if (foundObject.type === "INCOME") {
      setIsChecked(false);
    } else if (foundObject.type === "EXPENSE") {
      setIsChecked(true);
    }
  }, [foundObject.type]);

  const amountDefaultValue = Math.abs(foundObject.amount);
  const startDateDefaultValue = new Date(foundObject.transactionDate);
  const commentDefaultValue = foundObject.comment;

  const schema = yup.object().shape({
    amount: yup.number().required("Number invalid value"),
    transactionDate: yup.date().required("Date is required"),
    comment: yup.string().required("Comment is required"),
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      amount: amountDefaultValue,
      transactionDate: startDateDefaultValue,
      comment: commentDefaultValue,
    },
  });

  const onSubmit = (data) => {
    const editedTransaction = {
      categoryId: foundObject.categoryId,
      type: foundObject.type,
      amount:
        foundObject.type === "INCOME"
          ? Math.abs(data.amount)
          : Math.abs(data.amount) * -1,
      transactionDate: format(new Date(data.transactionDate), "yyyy-MM-dd"),
      comment: data.comment,
    };

    try {
      dispatch(
        editTransactions({
          id: IdForEdit,
          transaction: editedTransaction,
        })
      )
        .unwrap()
        .then(() => {
          toast.success("Transaction updated successfully");
          dispatch(closeEditModal());
        })
        .catch((error) => {
          toast.error(error || "Failed to update transaction");
        });
    } catch {
      toast.error("An error occurred while updating the transaction");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.type}>
          <div
            className={clsx(
              styles.type_text,
              !isChecked && styles.income_active
            )}
          >
            Income
          </div>
          <div className={styles.type_svg}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="22"
              viewBox="0 0 10 22"
              fill="none"
            >
              <path
                d="M8.80108 1.09786L1.19895 20.9021"
                stroke="#E0E0E0"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div
            className={clsx(
              styles.type_text,
              isChecked && styles.expense_active
            )}
          >
            Expense
          </div>
        </div>

        {isChecked && (
          <div className={styles.category_display}>{categoryName}</div>
        )}

        <div className={styles.sum_data_wrap}>
          <div className={styles.sum_wrap}>
            <input
              {...register("amount")}
              type="number"
              autoComplete="off"
              placeholder="0.00"
              className={styles.sum}
            />
            {errors.amount && (
              <span className={styles.comment_err}>Enter a number</span>
            )}
          </div>
          <div
            className={styles.data_wrap}
            onClick={() => setIsDatePickerOpen(true)}
          >
            <Controller
              name="transactionDate"
              control={control}
              defaultValue={startDateDefaultValue}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={(date) => {
                    field.onChange(date);
                    setIsDatePickerOpen(false);
                  }}
                  dateFormat="dd.MM.yyyy"
                  open={isDatePickerOpen}
                  onClickOutside={() => setIsDatePickerOpen(false)}
                  className={styles.customDatePicker}
                  calendarClassName={styles.calendarClassName}
                  showPopperArrow={false}
                  popperClassName={styles.calendarPopper}
                  locale="en-US"
                  maxDate={new Date()}
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
        <div className={clsx(styles.comment, styles.comment_bottom)}>
          <input
            {...register("comment")}
            type="text"
            className={styles.input}
            placeholder="Comment"
            autoComplete="off"
          />
          {errors.comment && (
            <span className={styles.comment_err}>Enter a comment</span>
          )}
        </div>
        <div className={styles.btn_wrap}>
          <button
            className={clsx(styles.btn, styles.btn_add)}
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(onSubmit)(e);
            }}
          >
            SAVE
          </button>
          <button
            className={clsx(styles.btn, styles.btn_cancel)}
            type="button"
            onClick={() => dispatch(closeEditModal())}
          >
            CANCEL
          </button>
        </div>
      </form>
    </>
  );
}

export default EditTransactionForm;
