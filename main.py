import random

FILE_LOC = "qa_s.txt"

lines = []
q = []
a = []
options = ['A', 'B', 'C', 'D']
with open(FILE_LOC) as file:
    lines = file.read().splitlines()

for line in lines:
    line = line.split("?")
    q.append(line[0])
    a.append(line[1])

print("--- Welcome to LoTR Quiz ---\n\n")

counter = 0
for question in q:
    print(f"Question: {question}?")
    a2 = a[counter].split(",", 4)
    correct_answer = a2[0]
    shuffled_answers = a2[:]
    random.shuffle(shuffled_answers)
    for i, shuffled_answer in enumerate(shuffled_answers):
        if shuffled_answer == correct_answer:
            correct_answer = options[i]
    counter2 = 0
    for answer in shuffled_answers:
        print(options[counter2], answer)
        counter2 += 1
    counter += 1
    user_answer = input("Answer: ")
    if user_answer.capitalize() == correct_answer.capitalize():
        print("Correct")
    else:
        print("Incorrect")

'''
A New Zealand
B Sudan
C South Africa
D England

https://docs.python.org/3/library/random.html#random.shuffle
https://docs.python.org/3/library/functions.html#input
'''