from flask import Flask, request, jsonify
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Apply CORS to the app

# Load OrderHistory and ProductsList.csv files
global order_history
order_history = pd.read_csv("OrderHistory.csv")
products_list = pd.read_csv("ProductsList.csv")

# Assuming you have columns 'ProductId' and 'product_description' in ProductsList.csv
# Map product descriptions to ProductId
# product_descriptions = products_list.set_index('ProductId')['description'].to_dict()

# # Sample a subset of your data (assuming df1 is your DataFrame)
# sample_size = 1000  # Adjust as needed
# df2 = order_history.sample(n=sample_size, random_state=42)
# df2.index = range(1, len(df2) + 1)

# # Merge df2 with product_descriptions based on ProductId
# df2 = df2.merge(products_list[['ProductId', 'description']], on='ProductId', how='left')

# # Fill missing descriptions with an empty string
# df2['description'] = df2['description'].fillna('')

# # Create a TfidfVectorizer for product descriptions
# tfidf = TfidfVectorizer(stop_words='english')

# # Construct the required TF-IDF matrix by fitting and transforming the data
# tfidf_matrix = tfidf.fit_transform(df2['description'])

# # Compute the cosine similarity matrix
# cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
# indices = pd.Series(df2.index, index=df2['ProductId']).drop_duplicates()



@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    product_id = data.get('product_id')

    # Load product information from OrderHistory.csv based on product_id
    product_info = order_history[order_history['ProductId'] == product_id].iloc[0]
    pd.concat([order_history, product_info], ignore_index=True)
    product_descriptions = products_list.set_index('ProductId')['description'].to_dict()

# Sample a subset of your data (assuming df1 is your DataFrame)
    sample_size = 1000  # Adjust as needed
    df2 = order_history.sample(n=sample_size, random_state=42)
    

    # Merge df2 with product_descriptions based on ProductId
    df2 = df2.merge(products_list[['ProductId', 'description']], on='ProductId', how='left')

    # Fill missing descriptions with an empty string
    df2['description'] = df2['description'].fillna('')

    product_info_df = pd.DataFrame(product_info).transpose()
    product_info_df['description'] = product_descriptions.get(product_info['ProductId'], '')
    print(product_info)
    df2 = pd.concat([df2, product_info_df], axis=0)
    df2.index = range(1, len(df2) + 1)
    print(df2)
    # Create a TfidfVectorizer   for product descriptions
    tfidf = TfidfVectorizer(stop_words='english')

    # Construct the required TF-IDF matrix by fitting and transforming the data
    tfidf_matrix = tfidf.fit_transform(df2['description'])

    # Compute the cosine similarity matrix
    cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
    indices = pd.Series(df2.index, index=df2['ProductId']).drop_duplicates()
    def get_recommendations(product_id, cosine_sim=cosine_sim):
        idx = indices[product_id]
        sim_scores = list(enumerate(cosine_sim[idx]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        sim_scores = sim_scores[1:11]
        movie_indices = [i[0] for i in sim_scores]
        return df2['ProductId'].iloc[movie_indices].tolist()

    recommendations = get_recommendations(product_id)
    # Append the product information to the order_history DataFrame
    # order_history = order_history.append(product_info, ignore_index=True)
    # print(order_history)
    
    
    # Get product names based on product IDs
    product_names = [products_list.loc[products_list['ProductId'] == pid, 'product_name'].values[0] for pid in recommendations]

    return jsonify(product_names)


and this is my code





if __name__ == '__main__':
    app.run(host='127.0.0.1', port=9010, debug=True)
