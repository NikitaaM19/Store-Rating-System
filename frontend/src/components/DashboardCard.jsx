import "./DashboardCard.css";

function DashboardCard({ title, value, icon }) {
  return (
    <div className="dc-card">

      <div className="dc-icon">
        {icon}
      </div>

      <div className="dc-content">
        <p className="dc-title">{title}</p>
        <h2 className="dc-value">{value}</h2>
      </div>

    </div>
  );
}

export default DashboardCard;