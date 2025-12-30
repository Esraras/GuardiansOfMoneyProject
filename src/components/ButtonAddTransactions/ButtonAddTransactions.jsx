import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { addTransaction, fetchCategoriesThunk } from "../../redux/transactions/transactionsThunks";
import { selectCategories } from "../../redux/transactions/transactionsSelectors";

import css from "./ButtonAddTransactions.module.css";

const schema = yup.object({
  type: yup.string().oneOf(["INCOME", "EXPENSE"]).required(),
  amount: yup.number().typeError("Sum is required").moreThan(0, "Sum must be > 0").required(),
  transactionDate: yup.string().required("Date is required"),
  categoryId: yup.string().when("type", {
    is: "EXPENSE",
    then: (s) => s.required("Category is required"),
    otherwise: (s) => s.notRequired(),
  }),
  comment: yup.string().max(120, "Comment is too long").default(""),
});

export default function ButtonAddTransactions() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      type: "INCOME",
      amount: "",
      transactionDate: "",
      categoryId: "",
      comment: "",
    },
  });

  const type = watch("type");

  useEffect(() => {
    if (open) dispatch(fetchCategoriesThunk());
  }, [open, dispatch]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const closeModal = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = async (v) => {
    const payload = {
      type: v.type,
      amount: Number(v.amount),
      transactionDate: new Date(v.transactionDate).toISOString(),
      categoryId: v.type === "EXPENSE" ? v.categoryId : null,
      comment: v.comment || "",
    };

    const res = await dispatch(addTransaction(payload));
    if (addTransaction.fulfilled.match(res)) {
      closeModal();
    }
  };

  return (
    <>
      <button
        className={css.fab}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Add transaction"
      >
        +
      </button>

      {open && (
        <div className={css.overlay} onClick={closeModal}>
          <div className={css.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={css.title}>Add transaction</h2>

            <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
              {/* Income/Expense toggle */}
              <div className={css.switch}>
                <div className={css.switchInner}>
                  <button
                    type="button"
                    className={`${css.switchBtn} ${type === "INCOME" ? css.active : ""}`}
                    onClick={() => setValue("type", "INCOME")}
                  >
                    Income
                  </button>
                  <button
                    type="button"
                    className={`${css.switchBtn} ${type === "EXPENSE" ? css.active : ""}`}
                    onClick={() => setValue("type", "EXPENSE")}
                  >
                    Expense
                  </button>
                </div>
              </div>

              {/* Sum */}
              <div className={css.field}>
                <input className={css.input} placeholder="0.00" {...register("amount")} />
                {errors.amount && <div className={css.err}>{errors.amount.message}</div>}
              </div>

              {/* Date */}
              <div className={css.field}>
                <input className={css.input} type="date" {...register("transactionDate")} />
                {errors.transactionDate && (
                  <div className={css.err}>{errors.transactionDate.message}</div>
                )}
              </div>

              {/* Category */}
              {type === "EXPENSE" && (
                <div className={css.field}>
                  <select className={css.select} {...register("categoryId")}>
                    <option value="">Select category</option>
                    {categories.map((c) => (
                      <option key={c.id ?? c._id ?? c.categoryId} value={c.id ?? c._id ?? c.categoryId}>
                        {c.name ?? c.title ?? c.categoryName}
                      </option>
                    ))}
                  </select>

                  {errors.categoryId && <div className={css.err}>{errors.categoryId.message}</div>}
                </div>
              )}

              {/* Comment */}
              <div className={css.field}>
                <input className={css.input} placeholder="Comment" {...register("comment")} />
                {errors.comment && <div className={css.err}>{errors.comment.message}</div>}
              </div>

              <div className={css.actions}>
                <button className={css.btnPrimary} type="submit" disabled={isSubmitting}>
                  ADD
                </button>
                <button className={css.btnGhost} type="button" onClick={closeModal}>
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
