import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MenuCard from '../components/MenuCard';
import SectionHeading from '../components/SectionHeading';
import useMenuItems from '../hooks/useMenuItems';

function MenuPage() {
  const { menuItems, isLoading, error } = useMenuItems();
  const [activeTab, setActiveTab] = useState('all');
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const searchInput = useRef(null);

  const tabs = ['all', 'Pizza', 'Burger'];
  useEffect(() => {
    if (searchParams.get('focus') === 'search') {
      searchInput.current?.focus();
    }
  }, [searchParams]);

  const categoryFilteredItems =
    activeTab === 'all'
      ? menuItems
      : menuItems.filter((item) => item.category === activeTab || item.categorySlug === activeTab);
  const normalizedSearch = search.trim().toLocaleLowerCase();
  const filteredItems = categoryFilteredItems.filter((item) =>
    `${item.name} ${item.description}`.toLocaleLowerCase().includes(normalizedSearch),
  );

  return (
    <section className="menusection py-5 my-5">
      <div className="container">
        <SectionHeading title="Our Menu" />

        <div className="menu-search">
          <label className="visually-hidden" htmlFor="menu-search">Search menu items</label>
          <i className="bi bi-search" aria-hidden="true" />
          <input
            id="menu-search"
            ref={searchInput}
            type="search"
            className="form-control"
            placeholder="Search menu"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="foodmenuitems">
          <ul className="nav nav-tabs" role="tablist">
            {tabs.map((tab) => (
              <li className="nav-item" key={tab} role="presentation">
                <button
                  className={`nav-link ${activeTab === tab ? 'active' : ''}`}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'all' ? 'All' : tab}
                </button>
              </li>
            ))}
          </ul>

          <div className="tab-content py-4">
            <div className="tab-pane fade show active">
              {isLoading ? (
                <div className="text-center py-4">Loading menu...</div>
              ) : error ? (
                <div className="text-center py-4 text-danger" role="alert">{error}</div>
              ) : filteredItems.length === 0 ? (
                <div className="text-center py-4">No menu items found.</div>
              ) : (
                <div className="row">{filteredItems.map((item) => <MenuCard key={item.id} item={item} />)}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MenuPage;
