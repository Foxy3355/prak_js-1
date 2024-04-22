Vue.component("product", {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
        <div class="product-image">
        <img :alt="altText" :src="image" />
        </div>

        <div class="product-info">
            <div class="cart">
                <p>Cart({{ cart }})</p>
            </div>
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
        <p v-if="inventory > 10">In stock</p>
        <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
        <p v-else :class="{ decor: !inStock }">Out of stock</p>
        <p><span>{{ sale }}</span></p>
        <product-details></product-details>
        <p>Shipping: {{ shipping }}</p>
        <div class="color-box" v-for="(variant, index) in variants" :key="variant.variantId"
            :style="{ backgroundColor:variant.variantColor }" @mouseover="updateProduct(index)">
        </div>
        <ul>
            <li v-for="size in sizes">{{ size }}</li>
        </ul>
        <button v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">
            Add to cart
        </button>
        <button v-on:click="delToCart" :disabled="cart == 0" :class="{ disabledButton: cart == 0 }">Delete to cart</button><br><br>
        <a :href="link">More products like this.</a>
    </div>
    </div>
  `,
    data() {
        return {
            product: "Socks",
            brand: 'Vue Mastery',
            description: "A pair of warm, fuzzy socks",
            altText: "A pair of socks",
            selectedVariant: 0,
            link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
            inventory: 100,
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: "./assets/vmSocks-green-onWhite.jpg",
                    variantQuantity: 10,
                    variantOnSale: true
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 0,
                    variantOnSale: false
                }
            ],
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            cart: 0
        }
    },

    methods: {
        addToCart() {
            this.cart += 1
        },
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        },
        delToCart() {
            this.cart -= 1
        },
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale() {
            if (this.variants[this.selectedVariant].variantOnSale === true) {
                return 'On Sale!'
            } else {
                return '';
            }
        },
        shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return 2.99
            }
        }

    }

})

Vue.component("product-details", {
    template: `
              <div class="product-details">
                  <ul>
                      <li v-for="detail in details">{{ detail }}</li>
                  </ul>
              </div>
      `,
    data() {
        return {
            details: ["80% cotton", "20% polyester", "Gender-neutral"],
        };
    },
})

let app = new Vue({
    el: '#app',
    data: {
        premium: true
    }
})
