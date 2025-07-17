import React from 'react';

const ExampleComponent = () => {
  return (
    <div className="example-container">
      {/* Section Header */}
      <div className="section-header">
        <h2 className="section-title">Example Component</h2>
        <p className="section-subtitle">Demonstrating the standardized stylesheet system</p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Primary Card</h3>
            <div className="card-actions">
              <span className="badge badge-primary">New</span>
            </div>
          </div>
          <div className="card-body">
            <p>This card demonstrates the standardized card component with proper spacing, shadows, and hover effects.</p>
          </div>
          <div className="card-footer">
            <button className="btn btn-primary">Action</button>
            <span className="text-gray-500">Footer text</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Form Example</h3>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                className="form-input" 
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input 
                type="password" 
                className="form-input" 
                placeholder="Enter your password"
              />
            </div>
          </div>
          <div className="card-footer">
            <div className="form-actions">
              <button className="btn btn-secondary">Cancel</button>
              <button className="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Alert Examples</h3>
          </div>
          <div className="card-body">
            <div className="alert alert-success">
              <strong>Success!</strong> This is a success message.
            </div>
            <div className="alert alert-warning">
              <strong>Warning!</strong> This is a warning message.
            </div>
            <div className="alert alert-error">
              <strong>Error!</strong> This is an error message.
            </div>
            <div className="alert alert-info">
              <strong>Info!</strong> This is an info message.
            </div>
          </div>
        </div>
      </div>

      {/* Button Examples */}
      <div className="section">
        <h3>Button Variants</h3>
        <div className="btn-group">
          <button className="btn btn-primary">Primary</button>
          <button className="btn btn-secondary">Secondary</button>
          <button className="btn btn-success">Success</button>
          <button className="btn btn-warning">Warning</button>
          <button className="btn btn-error">Error</button>
        </div>
      </div>

      {/* Loading Examples */}
      <div className="section">
        <h3>Loading States</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="card">
            <div className="card-body text-center">
              <div className="loading-spinner"></div>
              <p className="mt-4">Loading with spinner...</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body text-center">
              <span className="loading-dots">Loading</span>
              <p className="mt-4">Loading with dots...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Utility Classes Example */}
      <div className="section">
        <h3>Utility Classes</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-primary text-white p-4 rounded-lg text-center">
            Primary Background
          </div>
          <div className="bg-secondary text-white p-4 rounded-lg text-center">
            Secondary Background
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            Gray Background
          </div>
          <div className="bg-white border border-gray-200 p-4 rounded-lg text-center shadow-md">
            White with Shadow
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExampleComponent; 