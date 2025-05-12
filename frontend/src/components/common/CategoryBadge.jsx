const CategoryBadge = ({ cat }) => (
    <span
      style={{
        backgroundColor: cat.color ?? "#ddd",
        color: "#fff",
        padding: "2px 8px",
        fontSize: "12px",
        fontWeight: 600,
        borderRadius: "12px",
        marginRight: "4px",
        display: "inline-block",
      }}
    >
      {cat.name}
    </span>
  );
  
  export default CategoryBadge;
  