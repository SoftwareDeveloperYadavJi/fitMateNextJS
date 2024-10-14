"use client"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Brain, MessageCircle, BarChart, Dumbbell, Utensils, TrendingUp, Zap, PlayCircle, Send } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function FilmatAIComplete() {
  const [activeTab, setActiveTab] = useState("workouts")
  const [workoutStarted, setWorkoutStarted] = useState(false)
  const [chatInput, setChatInput] = useState("")
  const [chatMessages, setChatMessages] = useState([
    { sender: "bot", message: "Hello! How can I assist you with your fitness journey today?" },
    { sender: "user", message: "I'd like some advice on post-workout nutrition." },
    { sender: "bot", message: "Great question! After a workout, it's important to replenish your energy and support muscle recovery. Aim for a meal or snack that combines protein and carbohydrates within 30 minutes to 2 hours after your workout. Good options include a protein shake with fruit, Greek yogurt with berries, or a turkey sandwich on whole grain bread." },
  ])

  const tabs = [
    { id: "chat", icon: MessageCircle, label: "Chat" },
    { id: "dashboard", icon: BarChart, label: "Dashboard" },
    { id: "workouts", icon: Dumbbell, label: "Workouts" },
    { id: "nutrition", icon: Utensils, label: "Nutrition" },
    { id: "progress", icon: TrendingUp, label: "Progress" },
    { id: "challenges", icon: Zap, label: "Challenges" },
  ]

  const workoutPhases = [
    { name: "Warm-up", exercises: ["Jumping Jacks", "Arm Circles", "Leg Swings", "High Knees"] },
    { name: "Main Circuit", exercises: ["Burpees", "Mountain Climbers", "Push-ups", "Squat Jumps"] },
    { name: "Cool-down", exercises: ["Light Jog", "Stretching", "Deep Breathing", "Relaxation"] },
  ]

  const nutritionPlan = [
    { meal: "Breakfast", foods: ["Oatmeal with berries", "Greek yogurt", "Almonds"] },
    { meal: "Lunch", foods: ["Grilled chicken breast", "Quinoa", "Mixed vegetables"] },
    { meal: "Dinner", foods: ["Baked salmon", "Sweet potato", "Broccoli"] },
    { meal: "Snacks", foods: ["Apple with peanut butter", "Protein shake", "Carrot sticks with hummus"] },
  ]

  const progressData = [
    { metric: "Weight", value: "68 kg", change: "-2 kg" },
    { metric: "Body Fat %", value: "18%", change: "-1.5%" },
    { metric: "Muscle Mass", value: "32 kg", change: "+1 kg" },
    { metric: "Resting Heart Rate", value: "62 bpm", change: "-3 bpm" },
  ]

  const challenges = [
    { name: "30-Day HIIT Challenge", participants: 1234, progress: 70 },
    { name: "10k Steps Daily", participants: 5678, progress: 85 },
    { name: "Mindful Eating Month", participants: 3456, progress: 50 },
  ]

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      setChatMessages([...chatMessages, { sender: "user", message: chatInput }])
      setChatInput("")
      // Simulate AI response
      setTimeout(() => {
        setChatMessages(prev => [...prev, { sender: "bot", message: "I understand your question about " + chatInput + ". Let me provide you with some tailored advice based on your fitness profile and goals." }])
      }, 1000)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#1e2028] text-gray-100">
      <header className="bg-[#2b2d3a] py-2 px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Brain className="h-8 w-8 text-purple-400" />
          <span className="text-xl font-bold text-purple-400">Filmat AI</span>
        </div>
        <nav className="hidden md:flex space-x-4">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant="ghost"
              className={`text-gray-300 hover:text-white px-2 py-1 ${activeTab === tab.id ? 'bg-[#3f4152]' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </Button>
          ))}
        </nav>
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </header>

      <nav className="bg-[#2b2d3a] p-1 flex justify-between items-center overflow-x-auto">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant="ghost"
            className={`flex-1 text-gray-400 hover:text-white ${activeTab === tab.id ? 'text-white bg-[#3f4152]' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon className="h-5 w-5 mr-2" />
            <span className="hidden sm:inline">{tab.label}</span>
          </Button>
        ))}
      </nav>

      <main className="flex-grow p-4 overflow-y-auto">
        {activeTab === "chat" && (
          <Card className="bg-[#2b2d3a] border-0 shadow-md h-[calc(100vh-200px)] flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-purple-400">Chat with Filmat AI</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
              <ScrollArea className="flex-grow mb-4">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`mb-4 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    <span className={`inline-block p-2 rounded-lg ${msg.sender === 'user' ? 'bg-purple-600' : 'bg-gray-700'} text-white`}>
                      {msg.message}
                    </span>
                  </div>
                ))}
              </ScrollArea>
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-grow bg-gray-700 border-gray-600 text-white"
                />
                <Button onClick={handleSendMessage} className="bg-purple-600 hover:bg-purple-700">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "dashboard" && (
          <Card className="bg-[#2b2d3a] border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-purple-400">Fitness Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-[#3f4152] border-0">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-gray-300">Daily Steps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8,742</div>
                    <Progress value={87} className="mt-2" />
                  </CardContent>
                </Card>
                <Card className="bg-[#3f4152] border-0">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-gray-300">Calories Burned</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">487</div>
                    <Progress value={65} className="mt-2" />
                  </CardContent>
                </Card>
                <Card className="bg-[#3f4152] border-0">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-gray-300">Active Minutes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">47</div>
                    <Progress value={78} className="mt-2" />
                  </CardContent>
                </Card>
                <Card className="bg-[#3f4152] border-0">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-gray-300">Sleep Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">82</div>
                    <Progress value={82} className="mt-2" />
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "workouts" && (
          <Card className="bg-[#2b2d3a] border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-purple-400">Today's AI-Generated Workout</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-medium text-gray-300">Full Body HIIT</span>
                <Button
                  className={`${workoutStarted ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'}`}
                  onClick={() => setWorkoutStarted(!workoutStarted)}
                >
                  <PlayCircle className="h-4 w-4 mr-2" />
                  {workoutStarted ? 'End Workout' : 'Start Workout'}
                </Button>
              </div>
              {workoutStarted && (
                <div className="space-y-4 mb-4">
                  <Progress value={33} className="w-full" />
                  <p className="text-center text-gray-300">Workout Progress: 33%</p>
                </div>
              )}
              <div className="grid gap-4 md:grid-cols-3">
                {workoutPhases.map((phase, index) => (
                  <Card key={index} className="bg-[#3f4152] border-0">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-purple-400">{phase.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc list-inside space-y-1 text-gray-300">
                        {phase.exercises.map((exercise, i) => (
                          <li key={i}>{exercise}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "nutrition" && (
          <Card className="bg-[#2b2d3a] border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-purple-400">Today's Nutrition Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {nutritionPlan.map((meal, index) => (
                  <Card key={index} className="bg-[#3f4152] border-0">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-purple-400">{meal.meal}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc list-inside space-y-1 text-gray-300">
                        {meal.foods.map((food, i) => (
                          <li key={i}>{food}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "progress" && (
          <Card className="bg-[#2b2d3a] border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-purple-400">Your Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {progressData.map((item, index) => (
                  <Card key={index} className="bg-[#3f4152] border-0">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-gray-300">{item.metric}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{item.value}</div>
                      <div className={`text-sm ${item.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                        {item.change}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "challenges" && (
          <Card className="bg-[#2b2d3a] border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-purple-400">Active Challenges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {challenges.map((challenge, index) => (
                  <Card key={index} className="bg-[#3f4152] border-0">
                    
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-purple-400">{challenge.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300">{challenge.participants} participants</span>
                        <span className="text-gray-300">{challenge.progress}% complete</span>
                      </div>
                      <Progress value={challenge.progress} className="w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <footer className="bg-[#2b2d3a] py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="text-sm text-gray-400 mb-2 sm:mb-0">
            © 2024 Filmat AI. All rights reserved.
          </div>
          <nav className="flex space-x-4">
            <a href="#" className="text-sm text-gray-400 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white">Terms of Service</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white">Contact Us</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}