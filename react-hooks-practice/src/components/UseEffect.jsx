import React, { useEffect, useState } from "react";

const UseEffect = () => {
    const [content, setContent] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!content) {
            setData([]);
            return;
        }

        setLoading(true);
        setError(null);
        setData([]); // clear old

        const controller = new AbortController();

        fetch(`https://fakestoreapi.com/${content}`, { signal: controller.signal })
            .then((res) => {
                if (!res.ok) throw new Error("Network response not ok");
                return res.json();
            })
            .then((json) => {
                const arr = Array.isArray(json) ? json : [json];
                setData(arr);
            })
            .catch((err) => {
                if (err.name !== "AbortError") setError(err.message || "Fetch error");
            })
            .finally(() => setLoading(false));

        return () => controller.abort();
    }, [content]);

    return (
        <div className="UseEffectPage" aria-busy={loading}>
            <h1>useEffect</h1>

            <div className="options" role="tablist" aria-label="API endpoints">
                <button
                    onClick={() => setContent("products")}
                    aria-pressed={content === "products"}
                    disabled={loading && content !== "products"}
                >
                    products
                </button>
                <button
                    onClick={() => setContent("carts")}
                    aria-pressed={content === "carts"}
                    disabled={loading && content !== "carts"}
                >
                    carts
                </button>
                <button
                    onClick={() => setContent("users")}
                    aria-pressed={content === "users"}
                    disabled={loading && content !== "users"}
                >
                    users
                </button>
            </div>

            <main>
                {!content && <p>Select an endpoint above.</p>}
                {loading && <p>Loading...</p>}
                {error && <p style={{ color: "tomato" }}>Error: {error}</p>}

                <div className="content">
                    {/* PRODUCTS */}
                    {content === "products" &&
                        Array.isArray(data) &&
                        data.map((obj) => (
                            <div key={obj.id} className="items">
                                <img src={obj.image} alt={obj.title || "product image"} className="item-img" />
                                <div className="item-body">
                                    <h3>Title: {obj.title}</h3>
                                    <h4>Category: {obj.category}</h4>
                                    <p>Price: {obj.price}$</p>
                                    <p>
                                        rating: {obj.rating?.rate ?? "-"} / {obj.rating?.count ?? "-"}
                                    </p>
                                    <p style={{ opacity: 0.9 }}>{obj.description}</p>
                                </div>
                            </div>
                        ))}

                    {/* CARTS */}
                    {content === "carts" &&
                        Array.isArray(data) &&
                        data.map((obj) => (
                            <div key={obj.id} className="items">
                                <div style={{ width: 96, height: 96, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.02)", borderRadius: 8 }}>
                                    <strong style={{ fontSize: 12 }}>Cart</strong>
                                </div>

                                <div className="item-body">
                                    <h3>Cart ID: {obj.id}</h3>
                                    <p>User Id: {obj.userId}</p>
                                    <p>
                                        at: {obj.date ? new Date(obj.date).toLocaleString() : "-"}
                                    </p>
                                    <p>Prod(S) in cart: {obj.products?.length ?? 0}</p>

                                    <p style={{ marginTop: 8, fontWeight: 600 }}>Products details:</p>
                                    <ul>
                                        {Array.isArray(obj.products) && obj.products.length > 0 ? (
                                            obj.products.map((product) => (
                                                <li key={product.productId}>
                                                    ProductId: {product.productId} & Quantity: {product.quantity}
                                                </li>
                                            ))
                                        ) : (
                                            <li>No products</li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        ))}

                    {/* USERS */}
                    {content === "users" &&
                        Array.isArray(data) &&
                        data.map((u) => (
                            <div key={u.id} className="items">
                                <img
                                    src={u.avatar || "https://via.placeholder.com/96"}
                                    alt={`${u.name?.firstname ?? ""} ${u.name?.lastname ?? ""}`}
                                    className="item-img"
                                />
                                <div className="item-body">
                                    <h3>
                                        {u.name?.firstname ?? "-"} {u.name?.lastname ?? "-"}
                                    </h3>
                                    <p><strong>Username:</strong> {u.username ?? "-"}</p>
                                    <p><strong>Email:</strong> {u.email ?? "-"}</p>
                                    <p><strong>Phone:</strong> {u.phone ?? "-"}</p>
                                    <div style={{ marginTop: 8 }}>
                                        <strong>Address:</strong>
                                        <div style={{ paddingLeft: 8 }}>
                                            <p>Street: {u.address?.street ?? "-"}</p>
                                            <p>Number: {u.address?.number ?? "-"}</p>
                                            <p>City: {u.address?.city ?? "-"}</p>
                                            <p>Zip: {u.address?.zipcode ?? "-"}</p>
                                            <p>Geo: {u.address?.geolocation?.lat ?? "-"} , {u.address?.geolocation?.long ?? "-"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </main>
        </div>
    );
};

export default UseEffect;
