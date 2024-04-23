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
        <button v-on:click="delFromCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">Delete to cart</button><br><br>
        <a :href="link">More products like this.</a>
    </div>
    <div class="review">
        <h2>Reviews</h2>
        <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul>
            <li v-for="review in reviews">
                <p>{{ review.name }}</p>
                <p>Rating: {{ review.rating }}</p>
                <p>{{ review.review }}</p>
                <p>Recommend: {{ review.recommend }}</p>
            </li>
        </ul>
    </div>
    <product-review @review-submitted="addReview"></product-review>
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
            reviews: []
        }
    },

    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        },
        delFromCart() {
            this.$emit('del-from-cart');
        },
        addReview(productReview) {
            this.reviews.push(productReview)
        }
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

Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
    <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
        <li v-for="error in errors">{{ error }}</li>
    </ul>
    </p>
    <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
    </p>

    <p>
        <label for="review">Review:</label>
        <textarea id="review" v-model="review"></textarea>
    </p>

    <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
        </select>
    </p>

    <p>Would you recommend this product?</p>
    <div class="question">
        <label for="recommend">Yes</label>
        <input type="radio" id="recommend" name="question" value="yes" v-model="recommend">
        <label for="recommend">No</label>
        <input type="radio" id="recommend" name="question" value="no" v-model="recommend">
    </div>

    <p>
        <input type="submit" value="Submit"> 
    </p>

    </form>
  `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: [],
            recommend: null
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating && this.recommend) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend
                }
                this.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
                this.recommend = null
            } else {
                if (!this.name) this.errors.push("Name required.")
                if (!this.review) this.errors.push("Review required.")
                if (!this.rating) this.errors.push("Rating required.")
                if (!this.recommend) this.errors.push("Recommend required.")
            }
        }
    }

})

let app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
        updateDelCart(id) {
            this.cart.pop(id);
        }
    }
})
