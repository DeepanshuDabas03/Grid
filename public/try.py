from flask import Flask, request, jsonify
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from flask_cors import CORS
import numpy as np
app = Flask(__name__)
CORS(app)  # Apply CORS to the app
global order_history
order_history = pd.read_csv("OrderHistory.csv")
products_list = pd.read_csv("ProductsList.csv")
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    product_id = data.get('product_id')
    product_id = int(product_id)
    # Load product information from OrderHistory.csv based on product_id
    product_info = products_list[products_list['ProductId'] == product_id].iloc[0]
    pd.concat([order_history, product_info], ignore_index=True)
    product_descriptions = products_list.set_index('ProductId')['description'].to_dict()

# Sample a subset of your data (assuming df1 is your DataFrame)
    sample_size = 2600  # Adjust as needed
    df2 = products_list.sample(n=sample_size, random_state=42)
    df2['description'] = df2['description'].fillna('')
    product_info_df = pd.DataFrame(product_info).transpose()
    insert_index = 459  # Adjust this to the desired index
    df2 = pd.concat([df2.iloc[:insert_index], product_info_df, df2.iloc[insert_index:]], axis=0)
    df2.index = range(1, len(df2) + 1)

    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform(df2['description'])
    cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
    indices = pd.Series(df2.index, index=df2['ProductId']).drop_duplicates()
    def get_recommendations(product_id, cosine_sim=cosine_sim):
        idx = indices[product_id] -1 # Use the mapped index from indices
        sim_scores = list(enumerate(cosine_sim[idx]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        sim_scores = sim_scores[1:11]
        movie_indices = [i[0] for i in sim_scores]
        return df2['ProductId'].iloc[movie_indices].tolist()


    recommendations = get_recommendations(product_id)
   

    return jsonify(recommendations)
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=9001, debug=True)
