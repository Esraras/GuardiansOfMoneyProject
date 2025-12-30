import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { editTransaction } from "../../redux/transactions/transactionsThunks";
import css from "./EditTransactionForm.module.css";

const schema = yup.object({
  amount: yup.number().typeError("Sum is required").moreThan(0, "Sum must be > 0").required(),
  transactionDate: yup.string().required("Date is required"),
  comment: yup.string().max(120, "Comment is too long").default(""),
});

export default function EditTransactionForm({ tx, onDone }) {
  const dispatch = useDispatch();

  const dateValue = tx.transactionDate ? String(tx.transactionDate).slice(0, 10) : "";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      amount: tx.amount ?? "",
      transactionDate: dateValue,
      comment: tx.comment ?? "",
    },
  });

  const onSubmit = async (v) => {
    const payload = {
      amount: Number(v.amount),
      transactionDate: new Date(v.transactionDate).toISOString(),
      comment: v.comment || "",
    };

    const res = await dispatch(editTransaction({ id: tx.id, payload }));
    if (editTransaction.fulfilled.match(res)) onDone();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.field}>
        <input className={css.input} placeholder="0.00" {...register("amount")} />
        {errors.amount && <div className={css.err}>{errors.amount.message}</div>}
      </div>

      <div className={css.field}>
        <input className={css.input} type="date" {...register("transactionDate")} />
        {errors.transactionDate && <div className={css.err}>{errors.transactionDate.message}</div>}
      </div>

      <div className={css.field}>
        <input className={css.input} placeholder="Comment" {...register("comment")} />
        {errors.comment && <div className={css.err}>{errors.comment.message}</div>}
      </div>

      <div className={css.actions}>
        <button className={css.btnPrimary} type="submit" disabled={isSubmitting}>
          SAVE
        </button>
        <button className={css.btnGhost} type="button" onClick={onDone}>
          CANCEL
        </button>
      </div>
    </form>
  );
}
