from flask import Flask, request, session, jsonify
from flask_cors import CORS

import collections as col
import json
import re
from urllib.request import urlopen

from bs4 import BeautifulSoup



app =Flask(__name__)
CORS(app)

class Food:
    def __init__(self, name, calories, protein, carbohydrates, fat, sugars):
        self.name = name
        self.calories = calories
        self.protein = protein
        self.carbohydrates = carbohydrates
        self.fat = fat
        self.sugars = sugars


    def to_dict(self):
        return {
            "Name": self.name,
            "Calories": self.calories,
            "Protein": self.protein,
            "Carbohydrates": self.carbohydrates,
            "Fat": self.fat,
            "Sugars": self.sugars,
        }

@app.route('/api/query')
def query_example():
    campus = request.args.get('campus')
    str = f"campus is {campus}"
    strval = campus
    session['strval'] = strval
    return str


@app.route("/api/plate", methods=['GET'])
def plate():

    campus = request.args.get('campus')

    #str_value = session.get('strval', 'No campus data available')
    #print(str_value)
    print(campus)

    if campus == "Livi":
        url =  "http://menuportal.dining.rutgers.edu/FoodPro/pickmenu.asp?sName=Rutgers+University+Dining&locationNum=03&locationName=Livingston+Dining+Commons&naFlag="
    elif campus == "Busch":
        url = "http://menuportal.dining.rutgers.edu/FoodPro/pickmenu.asp?sName=Rutgers+University+Dining&locationNum=04&locationName=Busch+Dining+Hall&naFlag=1"
    else:
        url =  "http://menuportal.dining.rutgers.edu/FoodPro/pickmenu.asp?sName=Rutgers+University+Dining&locationNum=03&locationName=Livingston+Dining+Commons&naFlag="



    page = urlopen(url)
    html = page.read().decode("utf-8")
    soup = BeautifulSoup(html, "html.parser")

    def getHref(html_content):
        if html_content and isinstance(html_content, str):
            href_soup = BeautifulSoup(html_content, 'html.parser')
            anchor_element = href_soup.find('a', href=True)  # Find the anchor element with the href attribute
            if anchor_element:
                href_value = anchor_element['href']  # Extract the href attribute value
                return href_value
                
                #print(href_value)
            else:
                print("No anchor element found.")
        else:
            print("not valid html")
        

    def contains_gram_weight(input_string):
        # Define a regular expression pattern for the gram weight format
        pattern = r'\d+(\.\d+)?g'
        #pattern2 = r'\d+(\.\d+)?mg'

        # Use re.search to find the pattern in the input string
        match = re.search(pattern, input_string)
        #if not match:
        # match = re.search(pattern2, input_string)
        

        # If a match is found, return True; otherwise, return False
        return match is not None

            
    def extractValue(text):
        substrings_to_check = ["Protein", "Tot. Carb", "Total Fat", "Sugars"] 
        #substring_found = False

        for ss in substrings_to_check:
            if ss in text: 
                #print(f"Found {ss} value")
                pattern = r'\d+\.\d+|\d+'

                # Use re.findall to find all substrings of decimal or whole numbers
                quant = re.findall(pattern, text)
                
                return (ss, quant)
        
        #print("extraction error")
        return 


    def parseMacros(href):
        #print(href)
        macro_list = ['Calories', "Protein", "Tot. Carb", "Total Fat", "Sugars"]
        macros = dict.fromkeys(macro_list)
        
        url = "http://menuportal.dining.rutgers.edu/FoodPro/" + href
        page = urlopen(url)
        html = page.read().decode("utf-8")
        tomato_soup = BeautifulSoup(html, "html.parser")

        #Calories
        facts_div = tomato_soup.find('div', {'id': 'facts'})
        calories_element = None

        # Check if the facts_div exists before trying to find the calories_element
        # Check if the facts_div exists before trying to find the calories_element
        if facts_div:
            calories_element = facts_div.find('p', {'class': 'strong'})

        if calories_element:
            calories = calories_element.get_text(strip=True)
            calories = int(''.join(filter(str.isdigit, calories)))
            
            macros['Calories'] = calories
            
        else:
            macros['Calories'] = 999
        # print("Calories information not found.")

        
        # Initialize variables to store the values
        # Find all td tags within the div
        tds = tomato_soup.find_all('td')

        for td_tag in tds:
            text = td_tag.get_text(strip=True)
            #print(text)

            if contains_gram_weight(text):    
                exact = extractValue(text)

                if exact:
                    macro, quant = extractValue(text)
                
                macros[macro] = float(quant[0])

        return macros
            
    allFoodsList = []

    #Creating Tuple of food names and nutrition info link
    foodnames = soup.findAll("div", attrs={"class": "col-1"})
    names = list(food.text for food in foodnames)

    macros = soup.findAll("div", attrs={"class": "col-3"})
    hrefs = list(getHref(str(macro)) for macro in macros)

    foodszip = zip(names, hrefs) 
    foods = list(foodszip)


    #Populate Dict
    for food in foods:
        name, href = food

        macros = parseMacros(href)
        
        calories = macros['Calories']
        fat = macros['Total Fat']
        sugars = macros['Sugars']
        carbs = macros['Tot. Carb']
        protein = macros['Protein']

        f = Food(name, calories, protein, carbs, fat, sugars)
        allFoodsList.append(f)
        

    # Convert the list of food objects to a list of dictionaries
    foods_list_of_dicts = [food.to_dict() for food in allFoodsList]

    # Convert the list of dictionaries to JSON
    #foods_json = json.dumps(foods_list_of_dicts, indent=4)

    # Print the JSON representation of the list of foods
    #print(foods_json)
    return jsonify(foods_list_of_dicts)

if __name__ == "__main__":
    app.run(debug=True, port=8080)