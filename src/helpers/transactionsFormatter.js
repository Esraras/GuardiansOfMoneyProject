export function getFormattedTransactions(
  transactions,
  categories,
  sortConfig = { key: "date", direction: "desc" }
) {
  const formattedTransactions = transactions.map((transaction) =>
    getFormattedTransaction(transaction, categories)
  );

  return sortTransactions(formattedTransactions, sortConfig);
}

export function sortTransactions(transactions, sortConfig) {
  return [...transactions].sort((a, b) => {
    if (sortConfig.key === "date") {
      return sortConfig.direction === "asc"
        ? a.date.localeCompare(b.date)
        : b.date.localeCompare(a.date);
    } else if (sortConfig.key === "type") {
      return sortConfig.direction === "asc"
        ? a.type.localeCompare(b.type)
        : b.type.localeCompare(a.type);
    } else if (sortConfig.key === "category") {
      return sortConfig.direction === "asc"
        ? a.category.localeCompare(b.category)
        : b.category.localeCompare(a.category);
    } else if (sortConfig.key === "comment") {
      const aComment = a.comment || "";
      const bComment = b.comment || "";
      return sortConfig.direction === "asc"
        ? aComment.localeCompare(bComment)
        : bComment.localeCompare(aComment);
    } else if (sortConfig.key === "sum") {
      return sortConfig.direction === "asc" ? a.sum - b.sum : b.sum - a.sum;
    }

    return sortConfig.direction === "asc"
      ? a.date.localeCompare(b.date)
      : b.date.localeCompare(a.date);
  });
}

function getFormattedTransaction(transaction, categories) {
  const {
    transactionDate: date,
    amount: sum,
    categoryId,
    type,
    comment,
    id,
  } = transaction;

  const category =
    type === "INCOME" ? "Income" : getCategoryName(categoryId, categories);

  const newTransaction = {
    id,
    date,
    type,
    category,
    comment,
    sum: Math.abs(sum),
  };
  return newTransaction;
}

function getCategoryName(id, categories) {
  if (!categories || !id) return "Unknown";
  const cat = categories.find((item) => item.id === id);
  return cat?.name || "Unknown";
}

export function getHeadTransaction() {
  return ["date", "type", "category", "comment", "sum"];
}

export function getStyleByType(type) {
  const currentColor =
    type === "-" ? "var(--red-color)" : "var(--yellow-color)";
  return {
    color: currentColor,
  };
}
