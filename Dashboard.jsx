import { CubeIcon, ShoppingCartIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import StatCard from '../components/StatCard';
import { useStats } from '../context/StatsContext';

function Dashboard() {
  const { totalProducts, totalOrders, revenue } = useStats();

  const stats = [
    {
      title: 'Total Products',
      value: totalProducts.toString(),
      icon: CubeIcon,
      color: 'bg-emerald-500'
    },
    {
      title: 'Total Orders',
      value: totalOrders.toString(),
      icon: ShoppingCartIcon,
      color: 'bg-blue-500'
    },
    {
      title: 'Revenue',
      value: `$${revenue}`,
      icon: CurrencyDollarIcon,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}

export default Dashboard;