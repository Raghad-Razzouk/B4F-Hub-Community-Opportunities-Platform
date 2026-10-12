import { useState, useEffect } from "react";
import { 
  Post, 
  PostCategory, 
  PostCategoryFilter, 
  Opportunity, 
  OpportunityTypeFilter, 
  WorkModeFilter 
} from "./types";

import { 
  fetchPosts, 
  createPost, 
  toggleLikePost, 
  fetchOpportunities, 
  applyToOpportunity 
} from "./api";

import PostForm from "./components/PostForm";
import PostItem from "./components/PostItem";
import CommunityFilters from "./components/CommunityFilters";
import OpportunityFilters from "./components/OpportunityFilters";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import OpportunityItem from "./components/Opportunity";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isloading, setLoading] = useState<boolean>(true);
  const [communityError, setCommunityError] = useState<string | null>(null);
  
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [isOpportunitiesLoading, setOpportunitiesLoading] = useState<boolean>(true);
  const [opportunitiesError, setOpportunitiesError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<PostCategoryFilter>("all");
  const [likedOnly, setLikedOnly] = useState<boolean>(false);

  const [oppSearchTerm, setOppSearchTerm] = useState("");
  const [oppTypeFilter, setOppTypeFilter] = useState<OpportunityTypeFilter>("all");
  const [oppModeFilter, setWorkModeFilter] = useState<WorkModeFilter>("all");
  const [savedOnly, setSavedOnly] = useState<boolean>(false);

  const [savedOpportunityIds, setSavedOpportunityIds] = useState<Set<string>>(new Set());
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleToggleSaveOpportunity = (id: string) => {
    setSavedOpportunityIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = categoryFilter === "all" || post.category === categoryFilter;
    const matchesSearch =
      post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLiked = !likedOnly || post.liked === true; 

    return matchesCategory && matchesSearch && matchesLiked;
  });

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch =
      opp.title?.toLowerCase().includes(oppSearchTerm.toLowerCase()) ||
      opp.company?.toLowerCase().includes(oppSearchTerm.toLowerCase()) ||
      opp.skills?.some(skill => skill.toLowerCase().includes(oppSearchTerm.toLowerCase()));

    const matchesType = oppTypeFilter === "all" || opp.type === oppTypeFilter;
    const matchesMode = oppModeFilter === "all" || opp.workMode === oppModeFilter;
    const matchesSaved = !savedOnly || savedOpportunityIds.has(opp.id); 

    return matchesSearch && matchesType && matchesMode && matchesSaved;
  });

  async function loadPosts() {
    setLoading(true);
    setCommunityError(null);
    try {
      const data = await fetchPosts();
      setPosts(data);
      setLoading(false);
    } catch (error) {
      setCommunityError("We could not load the community feed. Please check your connection and try again.");
      setLoading(false);
    }
  }

  async function loadOpportunities() {
    setOpportunitiesLoading(true); 
    setOpportunitiesError(null);
    try {
      const data = await fetchOpportunities();
      setOpportunities(data);
      setOpportunitiesLoading(false);
    } catch (error) {
      setOpportunitiesError("We could not load the opportunities. Please check your connection and try again.");
      setOpportunitiesLoading(false);
    }
  }

  // تحديث الإعجابات بالسيرفر
  async function handleLikeToggle(postId: string, currentLikes: number, currentIsLiked?: boolean) {
    const newIsLikedState = !currentIsLiked;
    const newLikesCount = newIsLikedState ? currentLikes + 1 : currentLikes - 1;
    try {
      const updatedPost = await toggleLikePost(postId, newLikesCount, newIsLikedState);
      setPosts((prevPosts) => prevPosts.map((post) => (post.id === postId ? updatedPost : post)));
    } catch (error) {
      setCommunityError("Failed to update like. Please try again.");
    }
  }

  async function handleApplyToOpportunity(opportunityId: string) {
    try {
      setOpportunitiesError(null);
      const updatedOpportunity = await applyToOpportunity(opportunityId);
      setOpportunities((prevOpps) => 
        prevOpps.map((opp) => opp.id === opportunityId ? updatedOpportunity : opp)
      );
    } catch (error: any) {
      setOpportunitiesError(error.message || "Failed to submit application. Please try again.");
    }
  }

  async function handleNewPostCreation(newPostData: { content: string; category: PostCategory }) {
    if (!newPostData.content.trim()) return;
    try {
      setCommunityError(null);
      const createdPost = await createPost(newPostData);
      setPosts((prevPosts) => [createdPost, ...prevPosts]);
    } catch (error) {
      setCommunityError("Failed to publish the post; please try again.");
    }
  }

  function handleCategoryChange(category: PostCategoryFilter) {
    setCategoryFilter(category);
    setSearchTerm("");
  }

  useEffect(() => {
    loadPosts();
    loadOpportunities();
  }, []);

  const totalPostsCount = posts.length;
const totalLikesCount = posts.filter(post => post.liked === true).length;
  const totalAppliedOpportunities = opportunities.filter(opp => opp.applied === true).length;

  return (
    <div className="app-container">
      <Navbar isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode(!isDarkMode)} />

      <main className="main-content">
        {/* قسم المجتمع */}
        <section className="community-section">
          <h2>Community</h2>
          {isloading && <p className="message">Loading the community feed...</p>}
          {!isloading && communityError && (
            <div className="message error">
              <p>{communityError}</p>
              <button className="retry-button" onClick={loadPosts}>Retry</button>
            </div>
          )}
          {!isloading && !communityError && (
            <>
              <PostForm onPostCreated={handleNewPostCreation} />
              
              <div className="community-filters-wrapper">
                <CommunityFilters
                  categoryFilter={categoryFilter}
                  onCategoryChange={handleCategoryChange}
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                />
                
                <label className="comm-checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={likedOnly} 
                    onChange={(e) => setLikedOnly(e.target.checked)} 
                  /> 
                  Liked only
                </label>
              </div>

              <div className="posts-feed">
                <h3>{filteredPosts.length} of {posts.length} posts shown</h3>
                {filteredPosts.length === 0 ? (
                  <p className="message">No posts found for this category.</p>
                ) : (
                  filteredPosts.map((post) => (
                    <PostItem key={post.id} post={post} onLikeToggle={handleLikeToggle} />
                  ))
                )}
              </div>
            </>
          )}
        </section>

        {/* قسم الفرص */}
        <section className="opportunities-section">
          <h2>Opportunities</h2>

          <div className="opportunities-filters-wrapper">
            <OpportunityFilters
              searchTerm={oppSearchTerm}
              onSearchChange={setOppSearchTerm}
              typeFilter={oppTypeFilter}
              onTypeChange={setOppTypeFilter}
              workModeFilter={oppModeFilter}
              onWorkModeChange={setWorkModeFilter}
            />

            <label className="opp-checkbox-label">
              <input 
                type="checkbox" 
                checked={savedOnly} 
                onChange={(e) => setSavedOnly(e.target.checked)} 
              /> 
              Saved only
            </label>
          </div>

          <h3>{filteredOpportunities.length} of {opportunities.length} opportunities shown</h3>

          {isOpportunitiesLoading && <p className="message">Loading opportunities...</p>}
          
          {!isOpportunitiesLoading && opportunitiesError && (
            <div className="message error">
              <p>{opportunitiesError}</p>
              <button className="retry-button" onClick={loadOpportunities}>Retry</button>
            </div>
          )}

          {!isOpportunitiesLoading && !opportunitiesError && filteredOpportunities.length === 0 && (
            <p className="message">No opportunities found.</p>
          )}

          {!isOpportunitiesLoading && !opportunitiesError && filteredOpportunities.length > 0 && (
            <div className="opportunities-feed">
              {filteredOpportunities.map((opportunity) => (
                <OpportunityItem 
                  key={opportunity.id} 
                  opportunity={opportunity} 
                  onApply={handleApplyToOpportunity}
                  isSaved={savedOpportunityIds.has(opportunity.id)}
                  onToggleSave={handleToggleSaveOpportunity}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer 
        totalPosts={totalPostsCount} 
        totalLikes={totalLikesCount} 
        totalApplied={totalAppliedOpportunities} 
      />
    </div>
  );
}

export default App;
